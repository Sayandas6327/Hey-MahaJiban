const userController = require("../controllers/users.controller");
const express = require('express');
const userRouter = express.Router();
const checkAuth = require("../middleware/auth");

//signup api
userRouter.post("/signup",userController.signup);
//signin api
userRouter.post("/signin",userController.signin);



module.exports = userRouter;
console.log("user router is working");