import { Request, Response } from "express";

import { handleError } from "../../common/filters/http-exception.filter";
import { WebSocketNotificationService } from "../websocket/websocket.service";
import { MonumentsService } from "./monuments.service";

/**
 * Controller for monuments management
 */
export class MonumentsController {
  constructor(private readonly monumentsService: MonumentsService) {}

  async getAllMonuments(req: Request, res: Response): Promise<Response> {
    try {
      const monuments = await this.monumentsService.findAll();

      return res.json({
        message: "Monuments retrieved successfully",
        data: monuments,
      });
    } catch (error: any) {
      const message = "Could not retrieve monuments";
      return handleError(res, error, message);
    }
  }

  async searchMonuments(req: Request, res: Response): Promise<Response> {
    const { title, country, city } = req.query;

    try {
      const monuments = await this.monumentsService.search({
        title: title as string,
        country: country as string,
        city: city as string,
      });

      return res.json({
        message: "Search results",
        data: monuments,
      });
    } catch (error: any) {
      const message = "Error searching monuments";
      return handleError(res, error, message);
    }
  }

  async getMonumentById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    try {
      const monument = await this.monumentsService.findById(id);

      if (!monument) {
        return res.status(404).json({
          message: "Monument not found",
          data: null,
        });
      }

      return res.json({
        message: "Monument retrieved successfully",
        data: monument,
      });
    } catch (error: any) {
      const message = "Error retrieving monument";
      return handleError(res, error, message);
    }
  }

  async createMonument(req: Request, res: Response): Promise<Response> {
    const { monument } = req.body;

    try {
      const newMonument = await this.monumentsService.create(monument);

      // Send WebSocket notification
      WebSocketNotificationService.notifyNewMonument(newMonument);

      return res.status(201).json({
        message: "Monument created successfully",
        data: newMonument,
      });
    } catch (error: any) {
      const message = "Error creating monument";
      return handleError(res, error, message);
    }
  }

  async updateMonument(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const { monument } = req.body;

    try {
      const updatedMonument = await this.monumentsService.update(id, monument);

      if (!updatedMonument) {
        return res.status(404).json({
          message: "Monument not found",
          data: null,
        });
      }

      return res.json({
        message: "Monument updated successfully",
        data: updatedMonument,
      });
    } catch (error: any) {
      const message = "Error updating monument";
      return handleError(res, error, message);
    }
  }

  async deleteMonument(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);

    try {
      const deleted = await this.monumentsService.delete(id);

      if (!deleted) {
        return res.status(404).json({
          message: "Monument not found",
          data: null,
        });
      }

      return res.json({
        message: "Monument deleted successfully",
        data: null,
      });
    } catch (error: any) {
      const message = "Error deleting monument";
      return handleError(res, error, message);
    }
  }
}
