const express = require("express");
const { handleUserSignup, handleUserSignin, handleUserLogout } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleUserSignup);

router.post("/signin", handleUserSignin);

router.get("/logout", handleUserLogout);

module.exports = router;

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
 *     description: Register a new user with full name, email, password, mobile number, and an optional profile image.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *                 description: Full name of the user
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: Password for the user account
 *               mobileNumber:
 *                 type: string
 *                 example: 1234567890
 *                 description: Mobile number of the user
 *               profileImageURL:
 *                 type: string
 *                 example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
 *                 description: Base64 encoded profile image URL (optional)
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request - validation errors
 *       500:
 *         description: Internal server error
 */
