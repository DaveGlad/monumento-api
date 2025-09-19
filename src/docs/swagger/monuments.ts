/**
 * @swagger
 * tags:
 *   - name: Monuments
 *     description: Monument management operations
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
