//loading the express 
const express = require('express');
const cors    = require('cors');
const env     = require('dotenv').config();
const db = require("./db");
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = express();
app.use(cors()); // to make the server cors free.
//enable POST Request 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Hey Mahajiban API</h1>");
});

//consuming the taskRouter here
// const taskRouter = require("./routes/tasks.routes");
const userRouter = require('./routes/users.routes');
// app.use("/api/tasks",taskRouter);
app.use("/api/users",userRouter);
//consuming the chatRouter here
// const chatRouter = require("./routes/chatbot.routes");
// app.use("/api/chat",chatRouter);

app.listen(PORT,HOST,()=>{
    console.log(`Express server has started at http://${HOST}:${PORT}/`);
})