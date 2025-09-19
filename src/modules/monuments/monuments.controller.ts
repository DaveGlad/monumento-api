import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Monuments
 *   description: Monument management operations
 */
import { handleError } from '../../common/filters/http-exception.filter';
import { WebSocketNotificationService } from '../websocket/websocket.service';
import { MonumentsService } from './monuments.service';

/**
 * Controller for monuments management
 */
export class MonumentsController {
  constructor(private readonly monumentsService: MonumentsService) {}

  /**
   * @swagger
   * /api/monuments:
   *   get:
   *     summary: Get all monuments
   *     description: Retrieve a list of all monuments
   *     tags: [Monuments]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of monuments
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Monuments retrieved successfully
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Monument'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Get all monuments
   * @param req - Request object
   * @param res - Response object
   */
  async getAllMonuments(req: Request, res: Response): Promise<Response> {
    try {
      const monuments = await this.monumentsService.findAll();
      
      return res.json({
        message: "Monuments retrieved successfully",
        data: monuments
      });
    } catch (error: any) {
      const message = "Could not retrieve monuments";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/monuments/search:
   *   get:
   *     summary: Search monuments by criteria
   *     description: Search monuments by title, country, or city
   *     tags: [Monuments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: title
   *         schema:
   *           type: string
   *         description: Monument title
   *       - in: query
   *         name: country
   *         schema:
   *           type: string
   *         description: Monument country
   *       - in: query
   *         name: city
   *         schema:
   *           type: string
   *         description: Monument city
   *     responses:
   *       200:
   *         description: Search results
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Search results
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Monument'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Search monuments by criteria
   * @param req - Request object
   * @param res - Response object
   */
  async searchMonuments(req: Request, res: Response): Promise<Response> {
    const { title, country, city } = req.query;
    
    try {
      const monuments = await this.monumentsService.search({
        title: title as string,
        country: country as string,
        city: city as string
      });
      
      return res.json({
        message: "Search results",
        data: monuments
      });
    } catch (error: any) {
      const message = "Error searching monuments";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/monuments/{id}:
   *   get:
   *     summary: Get a monument by ID
   *     description: Retrieve a monument by its ID
   *     tags: [Monuments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Monument ID
   *     responses:
   *       200:
   *         description: Monument details
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Monument retrieved successfully
   *                 data:
   *                   $ref: '#/components/schemas/Monument'
   *       404:
   *         description: Monument not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Get a monument by ID
   * @param req - Request object
   * @param res - Response object
   */
  async getMonumentById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    
    try {
      const monument = await this.monumentsService.findById(id);
      
      if (!monument) {
        return res.status(404).json({
          message: "Monument not found",
          data: null
        });
      }
      
      return res.json({
        message: "Monument retrieved successfully",
        data: monument
      });
    } catch (error: any) {
      const message = "Error retrieving monument";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/monuments:
   *   post:
   *     summary: Create a new monument
   *     description: Create a new monument with the provided data
   *     tags: [Monuments]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/MonumentCreateRequest'
   *     responses:
   *       201:
   *         description: Monument created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Monument created successfully
   *                 data:
   *                   $ref: '#/components/schemas/Monument'
   *       400:
   *         description: Invalid input
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Create a new monument
   * @param req - Request object
   * @param res - Response object
   */
  async createMonument(req: Request, res: Response): Promise<Response> {
    const { monument } = req.body;
    
    try {
      const newMonument = await this.monumentsService.create(monument);
      
      // Send WebSocket notification
      WebSocketNotificationService.notifyNewMonument(newMonument);
      
      return res.status(201).json({
        message: "Monument created successfully",
        data: newMonument
      });
    } catch (error: any) {
      const message = "Error creating monument";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/monuments/{id}:
   *   put:
   *     summary: Update a monument
   *     description: Update a monument with the provided data
   *     tags: [Monuments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Monument ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/MonumentUpdateRequest'
   *     responses:
   *       200:
   *         description: Monument updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Monument updated successfully
   *                 data:
   *                   $ref: '#/components/schemas/Monument'
   *       404:
   *         description: Monument not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Update a monument
   * @param req - Request object
   * @param res - Response object
   */
  async updateMonument(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const { monument } = req.body;
    
    try {
      const updatedMonument = await this.monumentsService.update(id, monument);
      
      if (!updatedMonument) {
        return res.status(404).json({
          message: "Monument not found",
          data: null
        });
      }
      
      return res.json({
        message: "Monument updated successfully",
        data: updatedMonument
      });
    } catch (error: any) {
      const message = "Error updating monument";
      return handleError(res, error, message);
    }
  }

  /**
   * @swagger
   * /api/monuments/{id}:
   *   delete:
   *     summary: Delete a monument
   *     description: Delete a monument by its ID
   *     tags: [Monuments]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Monument ID
   *     responses:
   *       200:
   *         description: Monument deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Monument deleted successfully
   *                 data:
   *                   type: null
   *       404:
   *         description: Monument not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   * 
   * Delete a monument
   * @param req - Request object
   * @param res - Response object
   */
  async deleteMonument(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    
    try {
      const deleted = await this.monumentsService.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          message: "Monument not found",
          data: null
        });
      }
      
      return res.json({
        message: "Monument deleted successfully",
        data: null
      });
    } catch (error: any) {
      const message = "Error deleting monument";
      return handleError(res, error, message);
    }
  }
}
