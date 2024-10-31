/*const express = require("express");
const books = express.Router();
const BooksModel = require("../models/Bookmodel");
const isArrayEmpty = require("../utiles/checkArrayLength");
const menageErrorMessage = require("../utiles/menageErrorMessages");
const Bookmodel = require("../models/Bookmodel");

books.get("/books", async (req, res) => {
  const { page, pageSize = 10 } = req.query;
  try {
    const books = await BooksModel.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const count = await BooksModel.countDocuments();

    const totalPages = Math.ceil(count / pageSize);

    if (isArrayEmpty(books)) {
      return res.status(404).send({
        statusCode: 404,
        message: "Books not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: `Books Found ${books.length}`,
      count,
      totalPages,
      books,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: menageErrorMessage(),
    });
  }
});

books.get("/books/:title", async (req, res) => {
  const { title } = req.params;
  const {page= 1, pageSize = 10} = req.query; 
  if (!title) {
    return res.status(400).send({
      statusCode: 400,
      message: "Title is required",
    });
  }
  try {
    const foundBooks = await BooksModel.find({ title: {
      $regex:"*" + title + "*",
      $options:"i",
    }})
    .limit(pageSize)
    .skip((page-1)*pageSize),

    const count = awit BooksModel.countDocuments({
      {
        const foundBooks = await BooksModel.find({ title: {
          $regex:"*" + title + "*",
          $options:"i",
        }
    })

    if(isArrayEmpty(books)) {
      return res.status(404).send({
        statusCode:404,
        message: "Title not Found"
      })
    }
    
    }
    res.status(200).send(foundBooks); // Restituisci l'array di libri trovati
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Oops, something went wrong",
    });
  }
});
module.exports = books;
*/
const express = require("express");
const books = express.Router();
const BooksModel = require("../models/Bookmodel");
const isArrayEmpty = require("../utiles/checkArrayLength");
const menageErrorMessage = require("../utiles/menageErrorMessages");
const validateBookBody = require("../middlewere/validateBookBody");
const upload = require("../middlewere/uploadsMutter");
const cloud = require("../middlewere/uploadsCloudinary");

// Route to get paginated books
books.get("/books", async (req, res, next) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const books = await BooksModel.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const count = await BooksModel.countDocuments();
    const totalPages = Math.ceil(count / pageSize);

    if (isArrayEmpty(books)) {
      return res.status(404).send({
        statusCode: 404,
        message: "Books not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `Books Found: ${books.length}`,
      count,
      totalPages,
      books,
    });
  } catch (error) {
    /*
     res.status(500).send({
      statusCode: 500,
      message: menageErrorMessage(),
    });
    */
    next(error);
  }
});

// Route to get books by title with pagination
books.get("/books/title/:title", async (req, res, next) => {
  const { title } = req.params;
  const { page = 1, pageSize = 10 } = req.query;

  if (!title) {
    return res.status(400).send({
      statusCode: 400,
      message: "Title is required",
    });
  }

  try {
    const foundBooks = await BooksModel.find({
      title: { $regex: title, $options: "i" },
    })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const count = await BooksModel.countDocuments({
      title: { $regex: title, $options: "i" },
    });

    const totalPages = Math.ceil(count / pageSize);

    if (isArrayEmpty(foundBooks)) {
      return res.status(404).send({
        statusCode: 404,
        message: "Title not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `Books Found: ${foundBooks.length}`,
      count,
      totalPages,
      books: foundBooks,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: menageErrorMessage(),
    });
  }
});

// Route to create a new book
/*
books.post("/books/create", [validateBookBody], async (req, res) => {
  const { title, img, price, category, asin } = req.body;
  if (!title || !asin || !price || !category || !img) {
    return res.status(400).send({
      statusCode: 400,
      message: "Non ce un cazzo",
    });
  }

  try {
    const newBook = new BooksModel({
      title,
      img,
      price,
      category,
      asin,
    });
    const book = await newBook.save();
    res.status(201).send({
      statusCode: 201,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error creating book",
    });
  }
});
*/
books.post("/books/create", [validateBookBody], async (req, res, next) => {
  console.log("Dati ricevuti per la creazione del libro:", req.body);
  const { title, img, price, category, asin } = req.body;

  if (!title || !asin || !price || !category || !img) {
    return res.status(400).send({
      statusCode: 400,
      message: "Alcuni campi obbligatori sono mancanti.",
    });
  }

  try {
    const newBook = new BooksModel({ title, img, price, category, asin });
    console.log("Payload inviato a /books/create:", newBook);
    const book = await newBook.save();
    res.status(201).send({
      statusCode: 201,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
});

// Route to get a book by ID
books.get("/books/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await BooksModel.findById(id);

    if (!book) {
      return res.status(404).send({
        statusCode: 404,
        message: "Book not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Book found",
      book,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error retrieving book",
    });
  }
});

// Route to update a book
books.patch("/books/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedBook = await BooksModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).send({
        statusCode: 404,
        message: "Book not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error updating book",
    });
  }
});

books.delete("/books/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBook = await BooksModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send({
        statusCode: 404,
        message: "Book not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    next(error);
  }
});

books.post("/books/upload", upload.single("img"), async (req, res, next) => {
  try {
    const url = `${req.protocol}://${req.get("host")}`; // http o https = protocol :// host
    const imgUrl = req.file.filename; // /uploads/nomefile-asdasfdsadfgsdfg.jpg
    res.status(200).json({ img: `${url}/uploads/${imgUrl}` });
  } catch (error) {
    next(error);
  }
});

books.post(
  "/books/upload/cloud",
  cloud.single("img"),
  async (req, res, next) => {
    try {
      res.status(200).json({ img: req.file.path });
    } catch (error) {
      next(error);
    }
  }
);
// Rotta per gli admin ( scrip aggiornare il moddello book con l agggiunta del commento )
books.patch("/books/updateModel", async (req, res, next) => {
  try {
    const result = await BooksModel.updateMany(
      { comments: { $exists: false } },
      { $set: { comments: [] } }
    );
    res.status(200).json({
      message: "Model updated succesfully",
      matchedCOunt: result.matchedCount,
      modifiedCOunt: result.modifiedCount,
    });
  } catch {
    next(error);
  }
});
module.exports = books;

/*
books.get("/books/:title", async (req, res) => {
  const { title } = req.params;
  if (!title) {
    return res.status(400).send({
      statusCode: 400,
      message: "User ID is required",
    });
  }
  try {
    const books = await BooksModel.find({ title: title });
    if (!books) {
      return res.status(404).send({
        statusCode: 404,
        message: "User ID not Found",
      });
    }
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Oops, something went wrong",
    });
  }
});
*/
