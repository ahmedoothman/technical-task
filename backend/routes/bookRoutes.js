const express = require('express');
const bookController = require('./../controllers/bookController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API to manage books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   price:
 *                     type: number
 *                   publishedDate:
 *                     type: string
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               price:
 *                 type: number
 *               publishedDate:
 *                 type: string
 *             required:
 *               - author
 *               - genre
 *               - price
 *               - publishedDate
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 price:
 *                   type: number
 *                 publishedDate:
 *                   type: string
 */
router.post('/', bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A book object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 price:
 *                   type: number
 *                 publishedDate:
 *                   type: string
 */
router.get('/:id', bookController.getBook);

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update a book's details
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               price:
 *                 type: number
 *               publishedDate:
 *                 type: string
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - price
 *               - publishedDate
 *     responses:
 *       200:
 *         description: Book updated successfully
 */
router.patch('/:id', bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted successfully
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
