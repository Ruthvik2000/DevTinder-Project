const express = require("express");
const User = require("./models/user");
const connectDB= require("./config/database");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app=express();

app.use(express.json()); 
app.use(cookieParser());  // Wherever any request will come to the server by using this the cookies will be parsed and token will be validated

app.post("/login",async (req,res)=>{
    const {emailId, password}= req.body;
    try{
    const user = await User.findOne({emailId: emailId}) // user points to the enitre document which match the emailId given in the body
    if(!user){
        throw new Error("Invalid creditinals")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password )
    if(isPasswordValid){
        //when the login is verified with email and password we have to generate the JWT token and send that to user

        // Create a JWT token

        const token = await jwt.sign({_id: user._id}, "Fall@4754*123"); //hiding user_id in the token and sending that to user as a cookie with seecret key

        console.log(token)

        //Add the token to cookie and send the response back to the user
        res.cookie("token",token);
        res.send("Login Successfull");
        
    }else{
        throw new Error("Invalid creditinals")
    }
    }catch(err){
        res.status(400).send("Erroor .."+ err.message);
    }
});


//After cookie as send to the user it as to verified at the user end
app.get("/profile", async(req,res) => {
    try{
        const cookies = req.cookies;
 
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid Token");
        }

        //Validate my token

        const decodedMessage = await jwt.verify(token,"Fall@4754*123" ) // We have to send the token with the same seceret key which was send at the token creation

        console.log(decodedMessage);
        const {_id} = decodedMessage // We will get the id from decoded message
        const user = await User.findById(_id);

        console.log("Logged in user is: " + _id + ":" + user.firstName) ;
        if(!user){
            throw new Error("User does not exist");
        }

        res.send("Reading cookies");
    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
});

connectDB()
    .then(() =>{
        console.log("Database connection established...");
        app.listen(7999,()=>{
            console.log("Server is listening on port 7999...");
        });
    })
    .catch((err) =>{
        console.error("Database cannot be connected!!");
    });