import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { User } from '../config/database';
import { UserInstance } from '../types/models';

// Lecture des clés pour JWT
const privateKey = fs.readFileSync('./src/auth/jwtRS256.key');

/**
 * Service pour la gestion de l'authentification
 */
export class AuthService {
  /**
   * Authentifie un utilisateur et génère des tokens JWT
   * @param username - Nom d'utilisateur
   * @param password - Mot de passe
   * @returns Informations d'authentification avec tokens
   */
  static async login(username: string, password: string): Promise<{
    userId: number;
    accessToken: string;
    refreshToken: string;
  }> {
    // Recherche de l'utilisateur
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Mot de passe incorrect');
    }

    // Génération du token d'accès
    const accessToken = jwt.sign(
      { userName: user.username },
      privateKey,
      { algorithm: 'RS256', expiresIn: '30m' }
    );

    // Génération du token de rafraîchissement
    const refreshToken = jwt.sign(
      { userName: user.username },
      privateKey,
      { algorithm: 'RS256', expiresIn: '7d' }
    );

    // Décodage du token de rafraîchissement pour obtenir sa date d'expiration
    const decodedRefreshToken = jwt.decode(refreshToken) as jwt.JwtPayload;
    const refreshTokenExpiry = new Date(decodedRefreshToken.exp! * 1000);

    // Mise à jour des tokens dans la base de données
    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = refreshTokenExpiry;
    await user.save();

    return {
      userId: user.id,
      accessToken,
      refreshToken
    };
  }

  /**
   * Enregistre un nouvel utilisateur
   * @param username - Nom d'utilisateur
   * @param password - Mot de passe
   * @returns L'utilisateur créé
   */
  static async register(username: string, password: string): Promise<UserInstance> {
    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Cet utilisateur existe déjà');
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await User.create({
      username,
      password: hashedPassword
    });

    return user;
  }

  /**
   * Rafraîchit le token d'accès à partir du token de rafraîchissement
   * @param refreshToken - Token de rafraîchissement
   * @returns Nouveau token d'accès
   */
  static async refreshToken(refreshToken: string): Promise<string> {
    // Recherche de l'utilisateur par token de rafraîchissement
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) {
      throw new Error('Token de rafraîchissement invalide');
    }

    // Vérification de l'expiration du token
    if (user.refreshTokenExpiry && user.refreshTokenExpiry < new Date()) {
      throw new Error('Token de rafraîchissement expiré');
    }

    // Génération d'un nouveau token d'accès
    const accessToken = jwt.sign(
      { userName: user.username },
      privateKey,
      { algorithm: 'RS256', expiresIn: '30m' }
    );

    return accessToken;
  }
}
