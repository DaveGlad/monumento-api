/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication operations
 *   - name: Favorites
 *     description: User favorites management
 *   - name: Monuments
 *     description: Monument management operations
 *   - name: Users
 *     description: User management operations
 *   - name: WebSockets
 *     description: WebSocket communication for real-time updates
 */

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

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns JWT tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT access token
 *                     refreshToken:
 *                       type: string
 *                       description: JWT refresh token
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing username or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Too many login attempts
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
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: User registration
 *     description: Registers a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or username already exists
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
 */

/**
 * @swagger
 * /api/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Refreshes an access token using a refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: JWT refresh token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token refreshed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: New JWT access token
 *       400:
 *         description: Missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Invalid or expired refresh token
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
 */

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
 *             type: object
 *             required:
 *               - title
 *               - country
 *               - city
 *             properties:
 *               title:
 *                 type: string
 *                 description: Monument title
 *               country:
 *                 type: string
 *                 description: Country where the monument is located
 *               city:
 *                 type: string
 *                 description: City where the monument is located
 *               buildYear:
 *                 type: integer
 *                 description: Year the monument was built
 *                 nullable: true
 *               picture:
 *                 type: string
 *                 description: URL to monument picture
 *                 nullable: true
 *               description:
 *                 type: string
 *                 description: Monument description
 *                 nullable: true
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
 */

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
 */

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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Monument title
 *               country:
 *                 type: string
 *                 description: Country where the monument is located
 *               city:
 *                 type: string
 *                 description: City where the monument is located
 *               buildYear:
 *                 type: integer
 *                 description: Year the monument was built
 *                 nullable: true
 *               picture:
 *                 type: string
 *                 description: URL to monument picture
 *                 nullable: true
 *               description:
 *                 type: string
 *                 description: Monument description
 *                 nullable: true
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
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get user's favorite monuments
 *     description: Get all monuments favorited by the authenticated user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite monuments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User favorites retrieved successfully
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
 *   post:
 *     summary: Add a monument to favorites
 *     description: Add a monument to the authenticated user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - monumentId
 *             properties:
 *               monumentId:
 *                 type: integer
 *                 description: ID of the monument to add to favorites
 *     responses:
 *       201:
 *         description: Monument added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Monument added to favorites
 *                 data:
 *                   $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Invalid input or monument already in favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 */

/**
 * @swagger
 * /api/favorites/{monumentId}:
 *   delete:
 *     summary: Remove a monument from favorites
 *     description: Remove a monument from the authenticated user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: monumentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the monument to remove from favorites
 *     responses:
 *       200:
 *         description: Monument removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Monument removed from favorites
 *                 data:
 *                   type: null
 *       404:
 *         description: Monument not found in favorites
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
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get the authenticated user's profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User profile retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
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
