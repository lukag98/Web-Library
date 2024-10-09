const express = require("express");
const router = express.Router();
const {
  getBooks,
  postBook,
  getBook,
  deleteBook,
  updateBook,
  uploadBook,
  rentBook,
  returnBook,
  getRentalHistory,
} = require("../controllers/booksController");

// Serve uploaded files
router.use("/uploads", express.static("uploads"));

// Routes for handling books
router.route("/books").get(getBooks).post(uploadBook); // Handle both file upload and book creation
router.route("/books/:id").get(getBook).put(updateBook).delete(deleteBook);
router.post("/rent-book/:id", rentBook); // Route for renting a book
router.post("/return-book/:id", returnBook);
router.get("/rental-history", getRentalHistory);

module.exports = router;
