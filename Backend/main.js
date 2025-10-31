//loading the express 
const express = require('express');
//loading the cors
const cors    = require('cors');
//loading the dotenv
const env     = require('dotenv').config();
//loading the db
const db = require("./db");
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = express();
app.use(cors()); // to make the server cors free.
//SSR Server Static Resource enable for public folder
//accessible by frontend
app.use(express.static("public"));
//enable POST Request 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Hey Mahajiban API</h1>");
});
//consuming the userRouter here
const userRouter = require('./routes/users.routes');
app.use("/api/users",userRouter);
//consuming the bookRouter here
const bookRouter = require('./routes/books.routes');
app.use("/api/books",bookRouter);

app.listen(PORT,HOST,()=>{
    console.log(`Express server has started at http://${HOST}:${PORT}/`);
})