const mongoose = require('mongoose')
//Adding mongoose server side validation.
const bookSchema = mongoose.Schema({
    "title":{
        type: String,
        required:[true,"title is Required"],
    },
    "author":{
        type: String,
        required:[true,"author is Required"],
    },
    "description":{
        type: String,
        required:[true,"description is Required"],
    },
    "frontCover":{
        type: String,
        required:[true,"frontCover is Required"],
    },
    "backCover":{
        type: String,
        required:[true,"backCover is Required"],
    },
    "bookPdf":{
        type: String,
        required:[true,"bookPdf is Required"],
    },
    // "Summary":{
    //     type: String,
    //     required:[true,"Summary is Required"],
    // },
    // "publishedDate":{
    //     type:'String',
    //     required:[true,"publishedDate is Required"],
    // },
    // "publisher":{
    //     type:'String',
    //     required:[true,"publisher is Required"],
    // },
    // "price":{
    //     type:'Number',
    //     required:[true,"price is Required"],
    // },
    // "category":{
    //     type:'String',
    //     required:[true,"category is Required"],
    // },
    // "language":{
    //     type:'String',
    //     required:[true,"language is Required"],
    // },
    // "pages":{
    //     type:'Number',
    //     required:[true,"pages is Required"],
    // },
    "created":{
        type: Date,
        default: new Date()
    }
},{versionKey:false},{timestamps:true});

module.exports=mongoose.model("bookModel",bookSchema,"books");
console.log("book model is working");