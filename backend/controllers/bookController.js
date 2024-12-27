const Book = require('./../model/bookModel');
const factory = require('./handlerFactory');

exports.getBook = factory.getOne(Book);
exports.getAllBooks = factory.getAll(Book);

exports.createBook = factory.createOne(Book);

exports.updateBook = factory.updateOne(Book);

exports.deleteBook = factory.deleteOne(Book);
