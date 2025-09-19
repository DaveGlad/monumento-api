import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import rateLimit from 'express-rate-limit';

const router = Router();

// Limiteur de taux pour les tentatives de connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives par fenêtre
  message: {
    message: "Trop de tentatives de connexion. Veuillez réessayer plus tard.",
    data: null
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion utilisateur
 *     description: Authentifie un utilisateur et retourne un accessToken et un refreshToken.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Authentification échouée
 */
router.post('/login', loginLimiter, AuthController.login);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Inscription utilisateur
 *     description: Crée un nouvel utilisateur.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Utilisateur déjà existant
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /api/refresh-token:
 *   post:
 *     summary: Rafraîchir le token
 *     description: Génère un nouveau token d'accès à partir d'un token de rafraîchissement.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token rafraîchi avec succès
 *       400:
 *         description: Token de rafraîchissement manquant
 *       401:
 *         description: Token de rafraîchissement invalide ou expiré
 */
router.post('/refresh-token', AuthController.refreshToken);

export default router;
