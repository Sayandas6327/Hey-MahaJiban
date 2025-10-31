const express = require('express');
const booksController = require("../controllers/books.controller");
const bookRouter = express.Router();
const checkAuth = require("../middleware/auth");
const upload = require("../middleware/booksUpload");

bookRouter.post("/submit", (req, res, next) => {
  // console.log("📥 Request received at /api/books/submit");
    next();
  },
  upload.fields([
    { name: "frontCover", maxCount: 1 },
    { name: "backCover", maxCount: 1 },
    { name: "bookPdf", maxCount: 1 },
  ]),
  async (req, res) => {
    // console.log("✅ Files processed, entering controller...");
    await booksController.postBook(req, res);
  }
);

bookRouter.get("/all",checkAuth,booksController.getBook);

module.exports = bookRouter;
console.log("book router is working");