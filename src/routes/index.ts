import { Router } from 'express';
import favoriteRoutes from './favorite.routes';
import monumentRoutes from './monument.routes';
import authRoutes from './auth.routes';
// Importer d'autres routes au besoin

const router = Router();

// Préfixe pour toutes les routes
router.use('/api/favorites', favoriteRoutes);
router.use('/api/monuments', monumentRoutes);
router.use('/api', authRoutes);
// Ajouter d'autres routes au besoin

export default router;
