/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message de réponse
 *         data:
 *           type: object
 *           description: Données de réponse
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Page d'accueil de l'API
 *     description: Retourne un message de bienvenue
 *     responses:
 *       200:
 *         description: Message de bienvenue
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /swagger-test:
 *   get:
 *     summary: Test de la documentation Swagger
 *     description: Vérifie si la documentation Swagger est accessible
 *     responses:
 *       200:
 *         description: Page de test Swagger
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

// Ce fichier est uniquement destiné à la documentation Swagger
