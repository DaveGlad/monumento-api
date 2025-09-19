/**
 * @swagger
 * tags:
 *   name: WebSockets
 *   description: WebSocket communication for real-time updates
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WebSocketConnection:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: WebSocket connection URL
 *           example: ws://localhost:3000/socket.io/?EIO=4&transport=websocket
 *         auth:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: JWT authentication token
 *               example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
 *     WebSocketSendMessage:
 *       type: object
 *       properties:
 *         event:
 *           type: string
 *           description: Event name
 *           example: send_message
 *         data:
 *           type: object
 *           properties:
 *             monumentId:
 *               type: integer
 *               description: Monument ID
 *               example: 1
 *             message:
 *               type: string
 *               description: Message content
 *               example: This monument is amazing!
 *     WebSocketReceiveMessage:
 *       type: object
 *       properties:
 *         event:
 *           type: string
 *           description: Event name
 *           example: monument_message
 *         data:
 *           type: object
 *           properties:
 *             monumentId:
 *               type: integer
 *               description: Monument ID
 *               example: 1
 *             message:
 *               type: string
 *               description: Message content
 *               example: This monument is amazing!
 *             user:
 *               type: string
 *               description: Username of the sender
 *               example: testuser
 *             timestamp:
 *               type: string
 *               format: date-time
 *               description: Message timestamp
 *               example: 2025-09-19T12:25:36+01:00
 */

/**
 * @swagger
 * /socket.io:
 *   get:
 *     summary: WebSocket connection endpoint
 *     description: |
 *       Connect to the WebSocket server using Socket.IO.
 *
 *       ## Connection
 *
 *       ```javascript
 *       const socket = io('http://localhost:3000', {
 *         auth: {
 *           token: 'your_jwt_token'
 *         }
 *       });
 *       ```
 *
 *       ## Events
 *
 *       ### Send message
 *       ```javascript
 *       socket.emit('send_message', {
 *         monumentId: 1,
 *         message: 'This monument is amazing!'
 *       });
 *       ```
 *
 *       ### Receive message
 *       ```javascript
 *       socket.on('monument_message', (data) => {
 *         console.log(`Monument ${data.monumentId}: ${data.message} (from ${data.user})`);
 *       });
 *       ```
 *     tags: [WebSockets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       101:
 *         description: WebSocket connection established
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// This file is for documentation purposes only and doesn't contain actual code
