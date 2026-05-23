const express = require("express");
const connectDB= require("./config/database");
const User = require("./models/user");
const {validateSignupData} = require("./helpers/validation")
const bcrypt =require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./Middlewares_and_Error_Handlers/2_Authentication_Middleware");

const app=express();
app.use(express.json()); 
app.use(cookieParser());  // Wherever any request will come to the server by using this the cookies will be parsed and token will be validated


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

        const token = await jwt.sign({_id: user._id}, "Fall@4754*123", {expiresIn: "1d"});//hiding user_id in the token and sending that to user as a cookie with seecret key and token expires in 1 day
        console.log(token)

        //Add the token to cookie and send the response back to the user
        res.cookie("token",token, { expires: new Date(Date.now() + 8 * 3600000 )});
        res.send("Login Successfull");
        
    }else{
        throw new Error("Invalid creditinals")
    }
    }catch(err){
        res.status(400).send("Erroor .."+ err.message);
    }
});

//After cookie as send to the user it as to verified at the user end
app.get("/profile", userAuth, async(req,res) => {   //First userAuth will be called and if user exists then Request Handler (rer,res) will run
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

//Feed API - GET / feed- geet all the users from the database
app.post("/feed",async(req,res) =>{ 
    const userEmail= req.body.emailId; 
    try{
        const user = await User.findOne({emailId:userEmail});
        if(!user){
            res.status(400).send("User not found");
        }else{
            res.send(user)
        }
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
});

//delete user API - deleting a user by its parameter
app.delete("/user", async (req, res) => {
    const username = req.body.username; //variable name"username" should match with the property name in the documents of collection "User"

    try {
        const deletedUser  = await User.findOneAndDelete({username});
        if (!deletedUser) {
            res.status(404).send("User not found");
        }
        res.send(`User '${username}' deleted successfully`);
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

//Update data of the user
/*
We can also use PATCH /users/:id instead of sending userId in body.
app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;  

"http://localhost:7778/users/69418f6e4922390db2ea6a6e" --> in the postmon
*/
app.patch("/update",async (req,res)=>{
    const userId= req.body.userId;  //userId will be the Object id created by mongoosed for a document
    const data=req.body;
    //API Validation
    try{
    const Allowed_UPDATES=["userId","photoUrl","about","gender","age","skills"];

    const isUpdateAllowed = Object.keys(data).every((k) => Allowed_UPDATES.includes(k));

    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    if(data?.skills.length>10){
        throw new Error("Skills cannot be added more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "after",
        runValidators: true,
    });
    res.send("User updated successfully");
    }catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message);
    }

})


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


