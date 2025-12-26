//loading multer library
const multer = require("multer");
const fs = require("fs");
//loading path
//const path = require("path");
//loading cloudinary
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Ensure uploads folder exists
// const uploadPath = path.join(__dirname, `../public/books`);
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// Multer cloudinay storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "books",
    resource_type: "auto",
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