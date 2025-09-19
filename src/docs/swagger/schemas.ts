/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         data:
 *           type: null
 *           description: No data returned on error
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID
 *         username:
 *           type: string
 *           description: Username
 *         created:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *         updated:
 *           type: string
 *           format: date-time
 *           description: Last update date
 *     Monument:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Monument ID
 *         title:
 *           type: string
 *           description: Monument title
 *         country:
 *           type: string
 *           description: Country where the monument is located
 *         city:
 *           type: string
 *           description: City where the monument is located
 *         buildYear:
 *           type: integer
 *           description: Year the monument was built
 *           nullable: true
 *         picture:
 *           type: string
 *           description: URL to monument picture
 *           nullable: true
 *         description:
 *           type: string
 *           description: Monument description
 *           nullable: true
 *         created:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Favorite ID
 *         userId:
 *           type: integer
 *           description: User ID
 *         monumentId:
 *           type: integer
 *           description: Monument ID
 *         created:
 *           type: string
 *           format: date-time
 *           description: Creation date
 */
