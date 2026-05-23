const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth =  (req, res, next) => {
  console.log("Admin Auth is getting checked!!");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if ( !isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth =  async(req, res, next) => {
  //Read the token from the req cookies 
  try{ 
    const {token} = req.cookies;

    if(!token){
      return res.status(401).send("Please Login or Singup");
    }
    //Validate my token
    const decodedObj = await jwt.verify(token, "Fall@4756*2345");// We have to send the token with the same seceret key which was send at the token creation

    const {_id} = decodedObj;// We will get the id from decoded message

    const user= await User.findById(_id);
    if(!user){
      return res.status(404).send("User not found");
    }

    req.user =user;
    next();
  }catch(err){
    res.status(400).send("Error: " + err.message);
  } 
};

module.exports={
    userAuth
};