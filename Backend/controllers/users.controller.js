const userModel = require("../models/users.model");
//loading nodemailer
const nodemailer = require('nodemailer');
//loading the jwt token
const jwt = require('jsonwebtoken');
//loading the dotenv
const env = require('dotenv').config();
//importing bcrypt
const bcryptjs = require('bcryptjs');
//loading base url
const base_url = require("./base_url");

//importing mongoose
const { default: mongoose } = require("mongoose");
const { default: sendEmail } = require("../middleware/emailnodemailer");
// const { default: sendEmail } = require("../middleware/emailOTPsender"); //new
// const { default: sendEmail } = require("../middleware/emailresend"); //resend
const id = mongoose.Types.ObjectId;

//pasword hashing
const hashedPass = async(inputPass)=>{
    const hashed = await bcryptjs.hashSync(inputPass,10);
    return hashed;
}
const signup = async(req,res)=>{
    try{ 
        let pass1 = req.body.pass1;;
        let hashed = await hashedPass(pass1);
        let verifactionCode = Math.floor(Math.random() * 1000000).toString(); // Generate a random 6-digit number
   const userObj= await userModel.create({
        "name":req.body.name,
        "phone":req.body.phone,
        "email":req.body.email,
        "pass1":hashed,
        "profilePic":req.file
      ? `${base_url}/${req.file.filename}`
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "verifactionCode":verifactionCode
    //     "profilePic":req.file
    //   ? `${base_url}/uploads/${req.file.filename}`
    //   : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    
    });
    await sendEmail(userObj.email, verifactionCode);

    if(!userObj){
        res.status(200).json({"message":"Sign Up Error"});
    }else{
        res.status(200).json({"message":"Sign Up Successfull"});
    }

    }catch(error){
        res.status(403).json(error);
        console.error("Signup error:", error);
    }
}

const VerifyEmail = async(req,res)=>{
    try{
        let code = req.body.code;
        const userObj = await userModel.findOne({"verifactionCode":code}).exec();
        if(userObj){
            userObj.isVerified = true;
            userObj.verifactionCode = undefined;
            await userObj.save();
            res.status(200).json({"message":"Email Verified Successfully"});
        }else{
            res.status(200).json({"message":"Invalid Verification Code"});
        }
    }catch(error){
        res.status(403).json(error);
        console.error("Verification error:", error);
    
    }
}


const signin = async(req,res)=>{
    //   const user =  await userModel.findOne({"email":req.body.email, "isVerified":true}).lean();
    const user =  await userModel.findOne({"email":req.body.email}).exec(); //not checking the verification
      if (user){
          if(!user.isVerified){
            res.status(200).json({"message":"Please Verify Your Email"}); 
          }
          {
            const db_hashed_pass = user.pass1;
            const isValid =  await bcryptjs.compareSync(req.body.pass1,db_hashed_pass) ? true : false;
            if(isValid){
                //if login successfull then we will create the token
                const token = jwt.sign({"_id":user._id},process.env.SECRET_KEY,{expiresIn:"1h"});
                //res.status(200).json({"message":"login successfull","user":user});
                // const tasks = await taskModel.find({ userId: user._id });
                res.status(200).json({"message":"Sign In Successfull","token":token,"user":user});
            }else{
                res.status(200).json({"message":"Invalid Username or Password"});
            }
          }
      }else{
         res.status(200).json({"message":"No Such User Exists"});
      }
}


module.exports ={
    signup, signin, VerifyEmail
};

console.log("user controller is working");