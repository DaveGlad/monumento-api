import { Request, Response } from 'express';
import { MonumentService } from '../services/monument.service';
import { handleError } from '../utils/error-handler';

/**
 * Contrôleur pour la gestion des monuments
 */
export class MonumentController {
  /**
   * Crée un nouveau monument
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async createMonument(req: Request, res: Response): Promise<Response> {
    const { monument } = req.body;

    try {
      const createdMonument = await MonumentService.createMonument(monument);

      const message = `Le monument ${createdMonument.title} a bien été créé.`;
      return res.status(201).json({ message, data: createdMonument });
    } catch (error: any) {
      const message = "Le monument n'a pas pu être créé. Réessayez dans quelques instants.";
      return handleError(res, error, message);
    }
  }

  /**
   * Récupère tous les monuments
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async getAllMonuments(req: Request, res: Response): Promise<Response> {
    try {
      const monuments = await MonumentService.getAllMonuments();

      const message = "La liste des monuments a bien été récupérée.";
      return res.json({ message, data: monuments });
    } catch (error: any) {
      const message = "La liste des monuments n'a pas pu être récupérée. Réessayez dans quelques instants.";
      return handleError(res, error, message);
    }
  }

  /**
   * Récupère un monument par son ID
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async getMonumentById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    try {
      const monument = await MonumentService.getMonumentById(id);

      if (!monument) {
        return res.status(404).json({ message: "Le monument demandé n'existe pas.", data: null });
      }

      const message = "Le monument a bien été trouvé.";
      return res.json({ message, data: monument });
    } catch (error: any) {
      const message = "Le monument n'a pas pu être récupéré. Réessayez dans quelques instants.";
      return handleError(res, error, message);
    }
  }

  /**
   * Met à jour un monument
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async updateMonument(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const { monument } = req.body;

    try {
      const updatedMonument = await MonumentService.updateMonument(id, monument);

      if (!updatedMonument) {
        return res.status(404).json({ message: "Le monument demandé n'existe pas.", data: null });
      }

      const message = `Le monument ${updatedMonument.title} a bien été modifié.`;
      return res.json({ message, data: updatedMonument });
    } catch (error: any) {
      const message = "Le monument n'a pas pu être modifié. Réessayez dans quelques instants.";
      return handleError(res, error, message);
    }
  }

  /**
   * Supprime un monument
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async deleteMonument(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    try {
      const deleted = await MonumentService.deleteMonument(id);

      if (!deleted) {
        return res.status(404).json({ message: "Le monument demandé n'existe pas.", data: null });
      }

      const message = "Le monument a bien été supprimé.";
      return res.json({ message, data: null });
    } catch (error: any) {
      const message = "Le monument n'a pas pu être supprimé. Réessayez dans quelques instants.";
      return handleError(res, error, message);
    }
  }

  /**
   * Recherche des monuments par critères
   * @param req - Requête Express
   * @param res - Réponse Express
   */
  static async searchMonuments(req: Request, res: Response): Promise<Response> {
    const criteria = req.query;

    try {
      const monuments = await MonumentService.searchMonuments(criteria);

      const message = `${monuments.length} monument(s) trouvé(s).`;
      return res.json({ message, data: monuments });
    } catch (error: any) {
      const message = "La recherche n'a pas pu être effectuée. Réessayez dans quelques instants.";
      return handleError(res, error, message);
    }
  }
}
