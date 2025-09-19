/**
 * @swagger
 * tags:
 *   - name: Favorites
 *     description: User favorites management
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
