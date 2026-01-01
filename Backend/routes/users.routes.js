const userController = require("../controllers/users.controller");
const express = require('express');
const userRouter = express.Router();
const checkAuth = require("../middleware/auth");
const upload = require("../middleware/upload");

//signup api
userRouter.post("/signup", (req, res, next) => {
  upload.single("profilePic")(req, res, (err) => {
    if (err) console.warn("Multer error ignored:", err.message);
    next();
  });
}, userController.signup);
//signin api
userRouter.post("/signin",userController.signin);
//verify gmail otp
userRouter.post("/verifyemail",userController.VerifyEmail);

module.exports = userRouter;
console.log("user router is working");
