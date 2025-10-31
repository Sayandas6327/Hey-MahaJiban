//loading multer library
const multer = require("multer");
const fs = require("fs");
//loading path
const path = require("path");

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, `../public/books`);
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Optional file upload: allows requests without a file
const upload = multer({ storage });

// const uploadBookFiles = upload.fields([
//   { name: "frontCover", maxCount: 1 },
//   { name: "backCover", maxCount: 1 },
//   { name: "bookPdf", maxCount: 1 },
// ]);

module.exports = upload;
console.log("bookUpload middleware is working");