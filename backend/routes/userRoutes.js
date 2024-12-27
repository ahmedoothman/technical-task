const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage users
 */

/**
 * @swagger
 * paths:
 *  /signup:
 *    post:
 *      summary: Sign up a new user
 *      description: Creates a new user with the provided details.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                  format: password
 *                passwordConfirm:
 *                  type: string
 *                  format: password
 *      responses:
 *        201:
 *          description: User created successfully
 *        400:
 *          description: Invalid input
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      summary: Login a user
 *      description: Allows a user to log in using email and password.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                  format: password
 *      responses:
 *        200:
 *          description: Login successful
 *        400:
 *          description: Invalid email or password
 */
router.post('/login', authController.login);

/**
 * @swagger
 * paths:
 *  /logout:
 *    get:
 *      summary: Logout a user
 *      description: Logs out the user and invalidates their session.
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: User logged out successfully
 */
router.get('/logout', authController.logout);

/**
 * @swagger
 * paths:
 *  /forgotPassword:
 *    post:
 *      summary: Request password reset
 *      description: Sends an email with a reset token for password recovery.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *      responses:
 *        200:
 *          description: Reset link sent successfully
 *        400:
 *          description: Invalid email
 */
router.post('/forgotPassword', authController.forgotPassword);

/**
 * @swagger
 * paths:
 *  /resetPassword/{token}:
 *    patch:
 *      summary: Reset password with token
 *      description: Resets the password using the token provided in the URL.
 *      tags: [Users]
 *      parameters:
 *        - name: token
 *          in: path
 *          required: true
 *          description: The token for password reset
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *                  format: password
 *                passwordConfirm:
 *                  type: string
 *                  format: password
 *      responses:
 *        200:
 *          description: Password reset successfully
 *        400:
 *          description: Invalid token or mismatched passwords
 */
router.patch('/resetPassword/:token', authController.resetPassword);

/**
 * @swagger
 * paths:
 *  /verifyEmail/{token}:
 *    patch:
 *      summary: Verify user email
 *      description: Verifies the user’s email with the provided token.
 *      tags: [Users]
 *      parameters:
 *        - name: token
 *          in: path
 *          required: true
 *          description: The token for email verification
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Email verified successfully
 *        400:
 *          description: Invalid token
 */
router.patch('/verifyEmail/:token', authController.verifyEmail);

/**
 * @swagger
 * paths:
 * /updateMyPassword:
 *  patch:
 *   summary: Update logged-in user's password
 *  description: Allows a logged-in user to update their password.
 *  tags: [Users]
 *  requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                passwordCurrent:
 *                  type: string
 *                password:
 *                  type: string
 *                  format: password
 *                passwordConfirm:
 *                 type: string
 *                 format: password
 *      responses:
 *        200:
 *          description: Login successful
 *        400:
 *          description: Invalid emaiwl or password
 */
router.patch(
    '/updateMyPassword',
    authController.protect,
    userController.getMe,
    authController.updatePassword
);
/**
 * @swagger
 * paths:
 *  /me:
 *    get:
 *      summary: Get current logged-in user
 *      description: Retrieves the details of the logged-in user.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: User details retrieved successfully
 *        401:
 *          description: Unauthorized
 */
router.get(
    '/me',
    authController.protect,
    userController.getMe,
    userController.getUser
);

/**
 * @swagger
 * paths:
 *  /updateMe:
 *    patch:
 *      summary: Update logged-in user's details
 *      description: Allows a logged-in user to update their own details (name, email, etc.).
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                photo:
 *                  type: string
 *                  format: binary
 *      responses:
 *        200:
 *          description: User details updated successfully
 *        400:
 *          description: Invalid input
 */
router.patch('/updateMe', authController.protect, userController.updateMe);

/**
 * @swagger
 * paths:
 *  /deleteMe:
 *    delete:
 *      summary: Delete current logged-in user
 *      description: Deletes the account of the logged-in user.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: User deleted successfully
 *        400:
 *          description: Error in deleting user
 */
router.delete('/deleteMe', authController.protect, userController.deleteMe);

/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      summary: Get all users (admin only)
 *      description: Retrieves a list of all users (restricted to admin).
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: List of users retrieved successfully
 *        403:
 *          description: Forbidden
 */
router.get(
    '/',
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
);

/**
 * @swagger
 * paths:
 *  /:
 *    post:
 *      summary: Create a new user (admin only)
 *      description: Allows an admin to create a new user.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                  format: password
 *                role:
 *                  type: string
 *                  enum: [user, admin]
 *      responses:
 *        201:
 *          description: User created successfully
 *        400:
 *          description: Invalid input
 */
router.post(
    '/',
    authController.protect,
    authController.restrictTo('admin'),
    userController.createUser
);

/**
 * @swagger
 * paths:
 *  /{id}:
 *    get:
 *      summary: Get user by ID (admin only)
 *      description: Retrieves the user by their ID (restricted to admin).
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The user ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User retrieved successfully
 *        404:
 *          description: User not found
 */
router.get(
    '/:id',
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser
);

/**
 * @swagger
 * paths:
 *  /{id}:
 *    patch:
 *      summary: Update user by ID (admin only)
 *      description: Allows an admin to update a user’s details by ID.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The user ID
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                role:
 *                  type: string
 *                  enum: [user, admin]
 *      responses:
 *        200:
 *          description: User updated successfully
 *        404:
 *          description: User not found
 */
router.patch(
    '/:id',
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
);

/**
 * @swagger
 * paths:
 *  /{id}:
 *    delete:
 *      summary: Delete user by ID (admin only)
 *      description: Allows an admin to delete a user by their ID.
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The user ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User deleted successfully
 *        404:
 *          description: User not found
 */
router.delete(
    '/:id',
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
);

module.exports = router;
