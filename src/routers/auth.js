const express= require('express')

const authRouter = express.Router()
const User = require("../models/user");
const {validateSignupData} = require("../helpers/validation")
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");


//Signup
authRouter.post("/signup",async(req,res) => {
    try{
    //Validation of data
    validateSignupData(req);

    //Read body values
    const {firstName, lastName, emailId, password, age, gender, photoUrl, about, skills}= req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password,10);
    
    const checkEmail=await User.findOne({emailId});
    if(checkEmail){
      throw new Error("Email Already Exist")
    }

    //Creating a new User from the valided data, where raw data got from the body of POSTMAN
    //Save user with hashed password
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        age,
        gender,
        photoUrl,
        about,
        skills
    });
    const savedUser = await user.save();
    const token = await savedUser.getjwt();
    
    res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
    });
    
    res.status(201).json({ message: "User added successfully", data: savedUser });
    }
    catch(err){
        res.status(400).send("error saving the user"+ err.message);
    }
});


//login
authRouter.post("/login",async (req,res)=>{
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

        //const token = await jwt.sign({_id: user._id}, "Fall@4756*2345", {expiresIn: "10d"});//hiding user_id in the token and sending that to user as a cookie with seecret key and token expires in 1 day
        const token = await user.getjwt();
        console.log(token)

        //Add the token to cookie and send the response back to the user
        res.cookie("token",token, { 
            expires: new Date(Date.now() + 8 * 3600000 ),
            httpOnly: true, // prevents JS access (security)
            sameSite: "lax", // allows same-site + safe cross-site
            secure: false,   // true only in HTTPS (production)
            path: "/",          // important
        });
        res.status(200).json({user});//"Login Successfull" 
        
    }else{
        throw new Error("Invalid creditinals")
    }
    }catch(err){
        res.status(400).send("Erroor .."+ err.message);
    }
});


//logout
authRouter.post("/logout", async(req,res) => {
    /*
    res.cookie("token",null, {expires: new Date(Date.now())
    });
    res.send("Loged out sucessfully...!");
    */
    res.clearCookie("token", { 
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
    res.status(200).send("Logged out successfully");

});


module.exports = authRouter;
