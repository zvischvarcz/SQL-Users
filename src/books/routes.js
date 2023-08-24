const { Router } = require("express");

const bookRouter = Router();

const { addBook, getUserAndBooks } = require("./controllers");

bookRouter.post("/books/addBook", addBook);
bookRouter.get("/books/getUserAndBooks/:user", getUserAndBooks);

module.exports = bookRouter;