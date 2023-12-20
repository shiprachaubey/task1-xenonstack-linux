require('dotenv').config();

const express  = require("express");
const cookieParser = require('cookie-parser');

//express app
const app = express();


//regular middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie-parser and file upload
app.use(cookieParser());


app.get("/health",(req,res)=>{console.log('health is fine')})

// import all the routes

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");


//router middlewares

app.get("/",(req,res)=>{
    res.status(200).json({success:true,msg:"Hello from server"});
})

app.use("/api/v1",userRoutes);
app.use("/api/v1",contactRoutes);

module.exports=app;