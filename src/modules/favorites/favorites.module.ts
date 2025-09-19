import { Express, Router } from 'express';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

/**
 * Favorites module
 */
export class FavoritesModule {
  private readonly favoritesController: FavoritesController;
  
  constructor() {
    const favoritesService = new FavoritesService();
    this.favoritesController = new FavoritesController(favoritesService);
  }
  
  /**
   * Register module routes and middleware
   * @param app Express application instance
   */
  register(app: Express): void {
    const router = Router();
    
    // Define routes
    router.post('/:monumentId', this.favoritesController.addFavorite.bind(this.favoritesController));
    router.delete('/:monumentId', this.favoritesController.removeFavorite.bind(this.favoritesController));
    router.get('/', this.favoritesController.getFavorites.bind(this.favoritesController));
    
    // Register routes with prefix
    app.use('/api/favorites', router);
    
    console.log('Favorites module registered');
  }
}
