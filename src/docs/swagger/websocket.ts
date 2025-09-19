/**
 * @swagger
 * tags:
 *   - name: WebSockets
 *     description: WebSocket communication for real-time updates
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
 *       ### Send Events
 *
 *       ```javascript
 *       // Send a message about a monument
 *       socket.emit('send_message', {
 *         monumentId: 1,
 *         message: 'This monument is amazing!'
 *       });
 *       ```
 *
 *       ### Receive Events
 *
 *       ```javascript
 *       // Receive monument messages
 *       socket.on('monument_message', (data) => {
 *         console.log(`Monument ${data.monumentId}: ${data.message} (from ${data.user})`);
 *       });
 *
 *       // Receive new monument notifications
 *       socket.on('newMonument', (monument) => {
 *         console.log('New monument added:', monument);
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
