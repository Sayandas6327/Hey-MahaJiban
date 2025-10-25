//loading multer library
const multer = require("multer");
const fs = require("fs");
//loading path
const path = require("path");

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "../public/uploads");
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

module.exports = upload;
console.log("Upload middleware is working");
