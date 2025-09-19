import { Express, Router } from 'express';
import { MonumentsController } from './monuments.controller';
import { MonumentsService } from './monuments.service';

/**
 * Monuments module
 */
export class MonumentsModule {
  private readonly monumentsController: MonumentsController;
  
  constructor() {
    const monumentsService = new MonumentsService();
    this.monumentsController = new MonumentsController(monumentsService);
  }
  
  /**
   * Register module routes and middleware
   * @param app Express application instance
   */
  register(app: Express): void {
    const router = Router();
    
    // Define routes
    router.get('/', this.monumentsController.getAllMonuments.bind(this.monumentsController));
    router.get('/search', this.monumentsController.searchMonuments.bind(this.monumentsController));
    router.get('/:id', this.monumentsController.getMonumentById.bind(this.monumentsController));
    router.post('/', this.monumentsController.createMonument.bind(this.monumentsController));
    router.put('/:id', this.monumentsController.updateMonument.bind(this.monumentsController));
    router.delete('/:id', this.monumentsController.deleteMonument.bind(this.monumentsController));
    
    // Register routes with prefix
    app.use('/api/monuments', router);
    
    console.log('Monuments module registered');
  }
}
