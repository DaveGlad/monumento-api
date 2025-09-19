import { Router } from 'express';
import { FavoriteController } from '../controllers/favorite.controller';

const router = Router();

/**
 * @swagger
 * /api/favorites/{monumentId}:
 *   post:
 *     summary: Ajouter un monument aux favoris
 *     description: Ajoute un monument aux favoris de l'utilisateur connecté
 *     parameters:
 *       - in: path
 *         name: monumentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du monument à ajouter aux favoris
 *     responses:
 *       201:
 *         description: Monument ajouté aux favoris avec succès
 *       400:
 *         description: Monument déjà dans les favoris ou données invalides
 *       404:
 *         description: Monument non trouvé
 */
router.post('/:monumentId', FavoriteController.addFavorite);

/**
 * @swagger
 * /api/favorites/{monumentId}:
 *   delete:
 *     summary: Supprimer un monument des favoris
 *     description: Supprime un monument des favoris de l'utilisateur connecté
 *     parameters:
 *       - in: path
 *         name: monumentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du monument à supprimer des favoris
 *     responses:
 *       200:
 *         description: Monument supprimé des favoris avec succès
 *       404:
 *         description: Monument non trouvé dans les favoris
 */
router.delete('/:monumentId', FavoriteController.removeFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Récupérer les favoris
 *     description: Récupère la liste des monuments favoris de l'utilisateur connecté
 *     responses:
 *       200:
 *         description: Liste des favoris récupérée avec succès
 */
router.get('/', FavoriteController.getFavorites);

export default router;
