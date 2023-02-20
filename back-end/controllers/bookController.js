const Book = require("../models/Book");
const mongoose = require("mongoose");

// Get all books
const getBooks = async (req, res) => {
  const user_id = req.user._id;
  try {
    const books = await Book.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a book
const addBook = async (req, res) => {
  const { title, author, genre, pageNumber, rating, status } =
    req.body;
  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please make sure to add:", emptyFields });
  }

  // add document to database

  try {
    const user_id = req.user._id;
    const book = await Book.create({
      title,
      author,
      genre,
      pageNumber,
      rating,
      status,
      user_id,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found" });
  }

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) {
    return res.status(400).json({ error: "Book not found" });
  }

  res.status(200).json(book);
};

module.exports = {
  addBook,
  getBooks,
  deleteBook
};
