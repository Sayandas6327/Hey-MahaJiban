const bookModel = require("../models/books.model");
//loading the jwt token
const jwt = require('jsonwebtoken');
//loading the dotenv
const env = require('dotenv').config();
//loading base url
const base_url = require("./base_url");

//importing mongoose
const { default: mongoose } = require("mongoose");
const id = mongoose.Types.ObjectId;

const postBook = async(req,res)=>{
    try{
        // console.log("Incoming files:", req.files);
        // console.log("Incoming body:", req.body);
        const bookObj = await bookModel.create({
            "title":req.body.title,
            "author":req.body.author,
            "description":req.body.description,
            "price":req.body.price,
            "frontCover": req.files?.frontCover?.[0]?.filename
                        ? `${base_url}/books/${req.files.frontCover[0].filename}`
                        : null,
            "backCover": req.files?.backCover?.[0]?.filename
                        ? `${base_url}/books/${req.files.backCover[0].filename}`
                        : null,
            "bookPdf": req.files?.bookPdf?.[0]?.filename
                        ? `${base_url}/books/${req.files.bookPdf[0].filename}`
                        : null,
            // "Summary":req.body.Summary,
        });
        if(!bookObj){
            res.status(200).json({"message":"Post Book Error"});
        }else{
            res.status(200).json({"message":"Post Book Successfull"});
        }
    }
    catch(error){
        res.status(403).json(error);    
    }
};
const getBook = async(req,res)=>{
    try{
        const bookObj = await bookModel.find({}).exec();
        if(!bookObj){
            res.status(200).json({"message":"Get Book Error"});
        }else{
            res.status(200).json({"message":"Get Book Successfull","books":bookObj});
        }
    }
    catch(error){
        res.status(403).json(error);    
    }
};

module.exports ={
    postBook,getBook
};

console.log("book controller is working");