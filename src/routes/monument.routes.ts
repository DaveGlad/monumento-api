import { Router } from 'express';
import { MonumentsController } from '../modules/monuments/monuments.controller';

// Create an instance of the controller to use in routes
const monumentsService = {}; // This is a placeholder
const monumentController = new MonumentsController(monumentsService as any);

const router = Router();

/**
 * @swagger
 * /api/monuments:
 *   get:
 *     summary: Récupérer tous les monuments
 *     description: Récupère la liste de tous les monuments
 *     responses:
 *       200:
 *         description: Liste des monuments récupérée avec succès
 */
router.get('/', monumentController.getAllMonuments.bind(monumentController));

/**
 * @swagger
 * /api/monuments/search:
 *   get:
 *     summary: Rechercher des monuments
 *     description: Recherche des monuments selon différents critères
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Titre du monument (recherche partielle)
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Pays du monument (recherche partielle)
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Ville du monument (recherche partielle)
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 */
router.get('/search', monumentController.searchMonuments.bind(monumentController));

/**
 * @swagger
 * /api/monuments/{id}:
 *   get:
 *     summary: Récupérer un monument
 *     description: Récupère un monument par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du monument
 *     responses:
 *       200:
 *         description: Monument récupéré avec succès
 *       404:
 *         description: Monument non trouvé
 */
router.get('/:id', monumentController.getMonumentById.bind(monumentController));

/**
 * @swagger
 * /api/monuments:
 *   post:
 *     summary: Créer un monument
 *     description: Crée un nouveau monument
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monument:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   country:
 *                     type: string
 *                   city:
 *                     type: string
 *                   buildYear:
 *                     type: integer
 *                   picture:
 *                     type: string
 *                   description:
 *                     type: string
 *     responses:
 *       201:
 *         description: Monument créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', monumentController.createMonument.bind(monumentController));

/**
 * @swagger
 * /api/monuments/{id}:
 *   put:
 *     summary: Mettre à jour un monument
 *     description: Met à jour un monument existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du monument
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monument:
 *                 type: object
 *     responses:
 *       200:
 *         description: Monument mis à jour avec succès
 *       404:
 *         description: Monument non trouvé
 */
router.put('/:id', monumentController.updateMonument.bind(monumentController));

/**
 * @swagger
 * /api/monuments/{id}:
 *   delete:
 *     summary: Supprimer un monument
 *     description: Supprime un monument existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du monument
 *     responses:
 *       200:
 *         description: Monument supprimé avec succès
 *       404:
 *         description: Monument non trouvé
 */
router.delete('/:id', monumentController.deleteMonument.bind(monumentController));

export default router;
