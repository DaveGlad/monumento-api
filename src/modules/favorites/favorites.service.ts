import { User, Monument, Favorite } from '../../config/database';

/**
 * Service for favorites management
 */
export class FavoritesService {
  /**
   * Add a monument to a user's favorites
   * @param username - Username
   * @param monumentId - ID of the monument to add to favorites
   * @returns The created favorite object and the associated monument
   */
  async addFavorite(username: string, monumentId: number): Promise<{ favorite: any, monument: any }> {
    // Get user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if monument exists
    const monument = await Monument.findByPk(monumentId);
    if (!monument) {
      throw new Error('Monument not found');
    }

    // Create favorite
    const favorite = await Favorite.create({
      userId: user.id,
      monumentId: monumentId
    });

    return { favorite, monument };
  }

  /**
   * Remove a monument from a user's favorites
   * @param username - Username
   * @param monumentId - ID of the monument to remove from favorites
   * @returns The monument removed from favorites
   */
  async removeFavorite(username: string, monumentId: number): Promise<any> {
    // Get user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if favorite exists
    const favorite = await Favorite.findOne({
      where: {
        userId: user.id,
        monumentId: monumentId
      }
    });

    if (!favorite) {
      throw new Error("This monument is not in your favorites");
    }

    // Get monument details before deletion
    const monument = await Monument.findByPk(monumentId);
    if (!monument) {
      throw new Error('Monument not found');
    }

    // Delete favorite
    await favorite.destroy();

    return monument;
  }

  /**
   * Get all favorites for a user
   * @param username - Username
   * @returns The user's favorites with associated monuments
   */
  async getUserFavorites(username: string): Promise<{
    favorites: any[],
    monuments: any[],
    favoritesWithMonuments: Array<{ favorite: any, monument: any }>
  }> {
    // Get user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    // Get all favorites for the user
    const favorites = await Favorite.findAll({
      where: { userId: user.id }
    });

    // If no favorites are found
    if (favorites.length === 0) {
      return {
        favorites: [],
        monuments: [],
        favoritesWithMonuments: []
      };
    }

    // Get monument IDs from favorites
    const monumentIds = favorites.map(favorite => favorite.monumentId);

    // Get the monuments
    const monuments = await Monument.findAll({
      where: {
        id: monumentIds
      }
    });

    // Create a mapping for easy association
    const monumentsById: { [key: number]: any } = {};
    monuments.forEach(monument => {
      monumentsById[monument.id] = monument;
    });

    // Associate each favorite with its corresponding monument
    const favoritesWithMonuments = favorites.map(favorite => ({
      favorite,
      monument: monumentsById[favorite.monumentId]
    }));

    return {
      favorites,
      monuments,
      favoritesWithMonuments
    };
  }
}
