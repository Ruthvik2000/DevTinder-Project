const express = require("express")

const profileRouter = express.Router()
const User = require("../models/user");
const {userAuth} = require("../Middlewares_and_Error_Handlers/2_Authentication_Middleware");
const jwt = require("jsonwebtoken");
const { validateEditProfileData } = require("../helpers/validation");



//After cookie as send to the user it as to verified at the user end
profileRouter.get("/profile/view", userAuth, async(req,res) => {   //First userAuth will be called and if user exists then Request Handler (rer,res) will run
    try{
        const cookies = req.cookies;
 
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid Token");
        }

        //Validate my token

        const decodedMessage = await jwt.verify(token,"Fall@4756*2345" ) // We have to send the token with the same seceret key which was send at the token creation

        console.log(decodedMessage);
        const {_id} = decodedMessage // We will get the id from decoded message
        const user = await User.findById(_id);

        console.log("Logged in user is: " + _id + ":" + user.firstName) ;
        if(!user){
            throw new Error("User does not exist");
        }
        return res.status(200).json(user);
        //res.send(user);
    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
});

// Edit/Update data of the user by client
/*
We can also use PATCH /users/:id instead of sending userId in body.
app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;  

"http://localhost:7778/profile/edit/69418f6e4922390db2ea6a6e" --> in the postmon
*/
profileRouter.post("/profile/edit", userAuth, async (req,res)=>{
    //API Validation
    try{

    //1.Clean the request body (remove empty strings / null)
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "" || req.body[key] === null) {
        delete req.body[key];
      }
    });

    //2.Convert age to Number (if present)
    if (req.body.age !== undefined) {
      const ageNum = Number(req.body.age);
      // If conversion fails, remove it (or throw error - your choice)
      if (Number.isNaN(ageNum)) {
        throw new Error("Age must be a number");
      }
      req.body.age = ageNum;
    }

    //3.Validate edit fields (allowed keys, types if you added them)
    const isValid = validateEditProfileData(req);
    if (!isValid) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user; // This user comes from userAuth 
    
    Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
    

    await loggedInUser.save(); //Updates the filelds of the user in mongoDB

    //res.send(`${loggedInUser.firstName}, your profile updated successfully`);

    res.json({
        message: `${loggedInUser.firstName}, your profile updated successfully`,
        data : loggedInUser,
    });
    }catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message);
    }

});

profileRouter.patch("/profile/passwordchange", userAuth, async (req,res)=>{

});

module.exports = profileRouter;