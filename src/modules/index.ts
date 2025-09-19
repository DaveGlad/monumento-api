import { Express } from 'express';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MonumentsModule } from './monuments/monuments.module';
import { UsersModule } from './users/users.module';

/**
 * Register all modules with the Express application
 * @param app Express application instance
 */
export function registerModules(app: Express): void {
  // Initialize all modules
  const modules = [
    new AuthModule(),
    new FavoritesModule(),
    new MonumentsModule(),
    new UsersModule()
  ];
  
  // Register each module
  modules.forEach(module => module.register(app));
}
