const express = require("express");
const {
  addBook,
  getBooks,
  deleteBook,
} = require("../controllers/bookController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
router.use(requireAuth);

//GET all books
router.get("/", getBooks);

//POST a new book
router.post("/", addBook);

//DELETE a book by ID
router.delete("/:id", deleteBook);

module.exports = router;