const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../Middlewares_and_Error_Handlers/2_Authentication_Middleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//interested,ignored  --> API call 
requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res) =>{
    try{
        // user comes from Userauth after entering the details userauth will stores the send request data in mongoose
        const fromUserId = req.user._id; //  The ID of the user sending the connection request.This is the logged-in user, The person who initiates the connection request
        
        const toUserId = req.params.toUserId; // The ID of the user receiving the connection request, This is the target user

        const status = req.params.status;

        //check whether the userID which was  sent to the client was present in the DB or not
        const toUser= await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message : "User not found"});
        }

        //Status Check
        const allowedStatus = [ "ignored", "interested"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid status type:" + status);
        }

        //toUserId cant be same id of fromUserId its like client sending request to the client itself --> we can do it in schema level using mongoose pre

        /* case1: If there is existing Connectionrequest from client to other person in Db
           case 2:if the same person( who client wants to connect) also send connectionrequest during case 1
           the mongodb dont want to store them at a once it will become duplicate requests
           So, first of all we need to check theting exis connectio requests in the DB
        */
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId: toUserId,toUserId :fromUserId}, // Vise versa of case1 condition
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message: "Connection Request Already Exists!!" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save(); // this connection request save it into the DB

        if (status === "interested") {
            res.status(200).json({ 
                message: req.user.firstName+"is "+ status+" in " + toUser.firstName, 
                data,
            });
        } else if (status === "ignored"){
            res.status(200).json({ 
                message: req.user.firstName+ " "+ status+" " + toUser.firstName, 
                data,
            });
        }//res.json is like res.send
    }catch(err){
        res.status(400).json({
        message: err.message,
      });
    }
});

//accepted,rejected  --> API call 
requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) =>{
    try{
        const loggedInUser = req.user; //Logged in user this information comes from User Auth

        const { status, requestId } = req.params; 

        //Validate Status
        const allowedStatuses = ["accepted", "rejected"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
            message: "Invalid Status or Status not allowed",
            success: false,
            });
        }

        //validating the request
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });

        if (!connectionRequest) {
            return res.status(404).json({
                message: "request not found ",
                success: false,
            });
        }
        
        /*After finding the connection status is in Interested and also that satisfy the above validating the request process,
        then we change the status into accepted/rejected below*/

        connectionRequest.status = status;  // We are changing the status into accepted/rejected 
        const data = await connectionRequest.save(); //Saving the status from interested into accepted/rejected 
        
        res.status(200).json({
            message: "Connection request " + status,
            data,
            success: true,
        });
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;