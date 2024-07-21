# Product Management API

This project is an API for managing users, categories, and products. It includes endpoints for user signup, signin, logout, and category and product CRUD operations.

## API Documentation

The API documentation is generated using Swagger. Below are the available endpoints and their descriptions.

### User Management

#### User Signup

```swagger
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
