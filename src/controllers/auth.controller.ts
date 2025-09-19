import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { handleError } from '../utils/error-handler';

/**
 * Contrôleur pour la gestion de l'authentification
 */
export class AuthController {
  /**
   * Authentifie un utilisateur
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    // Validation des données
    if (!username || !password) {
      return res.status(400).json({
        message: "Le nom d'utilisateur et le mot de passe sont requis",
        data: null
      });
    }

    try {
      const authData = await AuthService.login(username, password);

      return res.json({
        message: "Authentification réussie",
        data: authData
      });
    } catch (error: any) {
      // Gestion spécifique pour les erreurs d'authentification
      if (error.message === 'Utilisateur non trouvé') {
        return res.status(401).json({
          message: "Utilisateur non trouvé",
          data: null
        });
      }

      if (error.message === 'Mot de passe incorrect') {
        return res.status(401).json({
          message: "Mot de passe incorrect",
          data: null
        });
      }

      const message = "Erreur lors de l'authentification";
      return handleError(res, error, message);
    }
  }

  /**
   * Enregistre un nouvel utilisateur
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async register(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    // Validation des données
    if (!username || !password) {
      return res.status(400).json({
        message: "Le nom d'utilisateur et le mot de passe sont requis",
        data: null
      });
    }

    try {
      const user = await AuthService.register(username, password);

      return res.status(201).json({
        message: "Utilisateur créé avec succès",
        data: {
          id: user.id,
          username: user.username
        }
      });
    } catch (error: any) {
      // Gestion spécifique pour les erreurs d'enregistrement
      if (error.message === 'Cet utilisateur existe déjà') {
        return res.status(409).json({
          message: "Cet utilisateur existe déjà",
          data: null
        });
      }

      const message = "Erreur lors de l'enregistrement";
      return handleError(res, error, message);
    }
  }

  /**
   * Rafraîchit le token d'accès
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    // Validation des données
    if (!refreshToken) {
      return res.status(400).json({
        message: "Le token de rafraîchissement est requis",
        data: null
      });
    }

    try {
      const accessToken = await AuthService.refreshToken(refreshToken);

      return res.json({
        message: "Token d'accès rafraîchi avec succès",
        data: { accessToken }
      });
    } catch (error: any) {
      // Gestion spécifique pour les erreurs de rafraîchissement de token
      if (error.message === 'Token de rafraîchissement invalide' || error.message === 'Token de rafraîchissement expiré') {
        return res.status(401).json({
          message: error.message,
          data: null
        });
      }

      const message = "Erreur lors du rafraîchissement du token";
      return handleError(res, error, message);
    }
  }
}
