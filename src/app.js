
const express = require("express");
const cors = require("cors");
const connectDB= require("./config/database");
//const User = require("./models/user");
//const {validateSignupData} = require("./helpers/validation")
//const bcrypt =require("bcrypt");
const cookieParser = require("cookie-parser");
//const jwt = require("jsonwebtoken");
//const {userAuth} = require("./Middlewares_and_Error_Handlers/2_Authentication_Middleware");



const app=express();
app.use(cookieParser());  // Wherever any request will come to the server by using this the cookies will be parsed and token will be validated
app.use(express.json()); 

const corsOptions = {
    origin: "http://localhost:5173",
    credentials : true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.options(/.*/, cors(corsOptions));


const authRouter = require("./routers/auth")
const profileRouter = require("./routers/profile")
const requestRouter = require("./routers/request")
const userRouter = require("./routers/user")

app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


// first connecting to database then allowing requests

connectDB()
    .then(() =>{
        console.log("Database connection established...");
        app.listen(8888,()=>{
            console.log("Server is listening on port 8888...");
        });
    })
    .catch((err) =>{
        console.error("Database cannot be connected!!");
    });


