const { connect } = require("../db/mongodb");
const multer = require("multer");
const path = require("path");
const { ObjectId } = require("mongodb");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const getBooks = async (req, res) => {
  try {
    const db = await connect();
    const books = await db.collection("books").find().toArray();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getBook = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  try {
    const db = await connect();
    const book = await db.collection("books").findOne({ id: bookId });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Knjiga nije pronađena" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const postBook = async (req, res) => {
  const newBook = req.body;
  try {
    const db = await connect();
    const books = await db.collection("books").find().toArray();
    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    newBook.id = newId;
    newBook.brojPrimeraka = parseInt(newBook.brojPrimeraka);

    // Include file path in the newBook object if an image is uploaded
    if (req.file) {
      newBook.imagePath = req.file.path;
    }

    await db.collection("books").insertOne(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  try {
    const db = await connect();
    const result = await db.collection("books").deleteOne({ id: bookId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Knjiga je obrisana" });
    } else {
      res.status(404).json({ message: "Knjiga nije pronađena" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const updatedBook = req.body;

  try {
    const db = await connect();

    // Remove the _id field from the updatedBook if it exists
    delete updatedBook._id;

    const result = await db
      .collection("books")
      .updateOne({ id: bookId }, { $set: updatedBook });

    if (result.matchedCount === 1) {
      const book = await db.collection("books").findOne({ id: bookId });
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Knjiga nije pronađena" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const rentBook = async (req, res) => {
  const bookId = req.params.id;
  const { userId, rentedAt } = req.body;

  try {
    const db = await connect();
    const book = await db
      .collection("books")
      .findOne({ _id: new ObjectId(bookId) });

    if (!book || book.brojPrimeraka <= 0) {
      return res
        .status(400)
        .json({ message: "Nema dovoljno primeraka knjige" });
    }

    const renterEntry = {
      userId: new ObjectId(userId),
      rentedAt: rentedAt || new Date(),
      returnedAt: null,
    };

    // Update the book's renters and decrease the available copies
    await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      {
        $push: { renters: renterEntry },
        $inc: { brojPrimeraka: -1 },
      }
    );

    // Update the user's rental history
    await db.collection("clients").updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: {
          rentalHistory: {
            bookId: new ObjectId(bookId),
            naslov: book.naslov,
            rentedAt: renterEntry.rentedAt,
            returnedAt: null,
          },
        },
      }
    );

    res.status(200).json({ message: "Knjiga je uspešno iznajmljena" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const returnBook = async (req, res) => {
  const bookId = req.params.id;
  const { userId, returnedAt } = req.body;

  try {
    const db = await connect();
    const book = await db
      .collection("books")
      .findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({ message: "Knjiga nije pronađena" });
    }

    const rentalIndex = book.renters.findIndex(
      (renter) =>
        renter.userId.equals(new ObjectId(userId)) && renter.returnedAt === null
    );

    if (rentalIndex === -1) {
      return res.status(400).json({
        message: "Korisnik nije iznajmio ovu knjigu ili je već vraćena",
      });
    }

    const returnDate = returnedAt || new Date();
    book.renters[rentalIndex].returnedAt = returnDate;

    // Update the book's renters and increase the available copies
    await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      {
        $set: { renters: book.renters },
        $inc: { brojPrimeraka: 1 },
      }
    );

    // Update the user's rental history to set the return date
    await db.collection("clients").updateOne(
      {
        _id: new ObjectId(userId),
        "rentalHistory.bookId": new ObjectId(bookId),
      },
      {
        $set: { "rentalHistory.$.returnedAt": returnDate },
      }
    );

    res.status(200).json({ message: "Knjiga je uspešno vraćena" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getRentalHistory = async (req, res) => {
  const bookId = req.params.id;

  try {
    const db = await connect();
    const book = await db
      .collection("books")
      .findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({ message: "Knjiga nije pronađena" });
    }

    res.status(200).json(book.renters);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// File upload endpoint
const uploadBook = [upload.single("file"), postBook];

module.exports = {
  getBooks,
  getBook,
  postBook,
  deleteBook,
  updateBook,
  uploadBook,
  rentBook,
  returnBook,
  getRentalHistory,
};
