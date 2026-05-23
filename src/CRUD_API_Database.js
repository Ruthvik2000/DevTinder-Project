const express = require("express");
const connectDB= require("./config/database");
const User = require("./models/user");

const app=express();
app.use(express.json()); 
/*app.use(express.json()) allows Express to read JSON data sent by the client (like from Postman, a browser, or a UI) 
and convert it into a JavaScript object so your routes can access it using req.body.
👉 Without this, Express cannot understand the data sent in the request body.
*/

//Singup Api
app.post("/signup",async(req,res) => {
    //Creating a new User from the data got from the body of POSTMAN
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User Added Successfully");
    }
    catch(err){
        res.status(400).send("error saving the user"+ err.message);
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
        app.listen(7778,()=>{
            console.log("Server is listening on port 7778...");
        });
    })
    .catch((err) =>{
        console.error("Database cannot be connected!!");
    });