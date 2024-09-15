/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: User signup
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               profileImageURL:
 *                 type: base64 string
 *     responses:
 *       201:
 *         description: User created successfull
 *       400:
 *         description: Validation errors
 *       500:
 *         description: Internal server error
 *       501:
 *         description: File upload error occured
 */

/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: User signin
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             mobileNumber: "1234567890"
 *             password: mysecretpassword
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Password is incorrect
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: User logout
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /api/category/add:
 *   post:
 *     summary: Add category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfull
 *       400:
 *         description: Validation errors
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category information
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the category
 *               description:
 *                 type: string
 *                 description: Updated description of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the product
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *               productImage:
 *                 type: string
 *                 format: uri
 *                 description: URL of the product image
 *               productCategory:
 *                 type: string
 *                 description: Category ID of the product
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Validation errors or category not found
 *       401:
 *         description: Authentication required or access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product information
 *       401:
 *         description: Authentication required or access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the product
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Updated price of the product
 *               description:
 *                 type: string
 *                 description: Updated description of the product
 *               category:
 *                 type: string
 *                 description: Updated category ID of the product
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation errors or category not found
 *       401:
 *         description: Authentication required or access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Authentication required or access denied
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/quantity/{id}:
 *   put:
 *     summary: Update the quantity of a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Updated quantity of the product
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Authentication required or access denied
 *       500:
 *         description: Internal server error
 */
