const express = require("express");
const connectDB= require("./config/database");
const User = require("./models/user");
const {validateSignupData} = require("./helpers/validation")
const bcrypt =require("bcrypt");

const app=express();
app.use(express.json()); 

//Signup
app.post("/signup",async(req,res) => {
    try{
    //Validation of data
    validateSignupData(req);

    //Read body values
    const {firstName, lastName, emailId, password }= req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password,10);


    //Creating a new User from the valided data, where raw data got from the body of POSTMAN
    //Save user with hashed password
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
    await user.save();
    res.status(201).send("User Added Successfully");
    }
    catch(err){
        res.status(400).send("error saving the user"+ err.message);
    }
});

//login
app.post("/login", async(req,res) =>{
try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});// user points to the enitre document which match the emailId given in the body

    if(!user){
        throw new Error("Ivalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new Error("Ivalid Credentials");
    }
    else{
        res.send("Login Successfull");
    }
}catch(err){
    res.status(400).send("Error: " + err.message);
}
});



// first connecting to database then allowing requests

connectDB()
    .then(() =>{
        console.log("Database connection established...");
        app.listen(7777,()=>{
            console.log("Server is listening on port 7777...");
        });
    })
    .catch((err) =>{
        console.error("Database cannot be connected!!");
    });


