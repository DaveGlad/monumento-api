import { Request, Response } from "express";

import { handleError } from "../../common/filters/http-exception.filter";
import { FavoritesService } from "./favorites.service";

/**
 * Controller for favorites management
 */
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  async addFavorite(req: Request, res: Response): Promise<Response> {
    const monumentId = parseInt(req.params.monumentId);
    const username = req.user.userName;

    try {
      console.log(
        `🔍 Adding monument ${monumentId} to user ${username}'s favorites`,
      );

      const result = await this.favoritesService.addFavorite(
        username,
        monumentId,
      );

      console.log(
        `✅ Monument ${monumentId} added to user ${username}'s favorites`,
      );

      return res.status(201).json({
        message: "Monument has been added to your favorites.",
        data: {
          favorite: result.favorite,
          monument: result.monument,
        },
      });
    } catch (error: any) {
      // Specific handling for unique constraint errors
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          message: "This monument is already in your favorites",
          data: null,
        });
      }

      const message =
        "The monument could not be added to favorites. Please try again later.";
      return handleError(res, error, message);
    }
  }

  async removeFavorite(req: Request, res: Response): Promise<Response> {
    const monumentId = parseInt(req.params.monumentId);
    const username = req.user.userName;

    try {
      console.log(
        `🔍 Removing monument ${monumentId} from user ${username}'s favorites`,
      );

      const monument = await this.favoritesService.removeFavorite(
        username,
        monumentId,
      );

      console.log(
        `✅ Monument ${monumentId} removed from user ${username}'s favorites`,
      );

      return res.json({
        message: "Monument has been removed from your favorites.",
        data: monument,
      });
    } catch (error: any) {
      // Specific handling for monument not found in favorites
      if (error.message === "This monument is not in your favorites") {
        return res.status(404).json({
          message: error.message,
          data: null,
        });
      }

      const message =
        "The monument could not be removed from favorites. Please try again later.";
      return handleError(res, error, message);
    }
  }

  /**
   * Get the list of favorite monuments for the connected user
   * @param req - Express Request
   * @param res - Express Response
   */
  async getFavorites(req: Request, res: Response): Promise<Response> {
    const username = req.user.userName;

    try {
      console.log(`🔍 Getting favorites for user ${username}`);

      const result = await this.favoritesService.getUserFavorites(username);

      // If no favorites are found
      if (result.favorites.length === 0) {
        return res.json({
          message: "You don't have any favorite monuments yet",
          data: { favorites: [], monuments: [] },
        });
      }

      console.log(
        `✅ ${result.monuments.length} favorite monuments retrieved for user ${username}`,
      );

      return res.json({
        message: "Favorite monuments list successfully retrieved",
        data: {
          favorites: result.favorites,
          monuments: result.monuments,
          favoritesWithMonuments: result.favoritesWithMonuments,
        },
      });
    } catch (error: any) {
      const message =
        "The favorites list could not be retrieved. Please try again later.";
      return handleError(res, error, message);
    }
  }
}
