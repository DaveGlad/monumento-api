import { Router } from 'express';
import { Express } from 'express';
import { AuthModule } from '../modules/auth/auth.module';
import { FavoritesModule } from '../modules/favorites/favorites.module';
import { MonumentsModule } from '../modules/monuments/monuments.module';
import { UsersModule } from '../modules/users/users.module';

// Legacy routes - to be removed once all modules are migrated
const router = Router();

// Function to register all modules
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

export default router;
