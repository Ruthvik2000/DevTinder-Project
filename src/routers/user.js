const express = require("express");
const userRouter = express.Router()
const { userAuth } = require("../Middlewares_and_Error_Handlers/2_Authentication_Middleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


const USER_SAFE_DATA = "firstName lastName photoUrl gender about skills";

//Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async(req,res) =>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id, //Some one has to send the user , it means the loggined user will be toUserId for other client
            status : "interested"   /* We want to only see the, someone who are interested in the user ,
                                    if we dont give this all status:[ignored", "interested", "accepted", "rejected"] will be shown*/
            
        }).populate("fromUserId", USER_SAFE_DATA);
        //.populate("fromUserId",["firstName", "lastName","photoUrl","gender","about","skills"]);//show case the firstName and last name from where the request was came

        if (connectionRequests) {      //if the connection request exists with interested status then show case them in UI
            return res.status(200).json({
                connectionRequests,
            });
        }
    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});


//To know who are the people accepted the request send by the user and checck the people who are accepted by the user
userRouter.get("/user/connections", userAuth, async(req,res) =>{
    try{
        const loggedInUser = req.user;

        /* 
        condition1: loggedUser either can be from "fromUserId" and "toUserId"
        example ,
        Ruthvik (send request) => Dhoni (it was accepted)
        Dhoni (send request) => Elon (it was accepted)
        Dhoni is toUserId in connection1 and Dhoni is fromUserId in connection2. So, when Dhoni looged in he has to view both the connections when he use "/user/connections" API

        condition2 : "status" field must be in "accepted" state in the ConnectionRequest collection.

        */

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status: "accepted"}, //  the loggedInUser accepted the request, which was send by others
                {fromUserId: loggedInUser._id, status: "accepted"},// the loggedInUser send the request to others and it was accepted
            ],
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);


        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.status(200).json({data});

    }catch(err){
        res.status(400).send("ERROR :" + err.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {

    /* User Should see all the user cards except
    0.his own card
    1.his connections
    2.ignored people
    3.already sent the conncetion request
    */
    const loggedInUser = req.user;

    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 10);
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users); // imp to send data in json format or else it will send in array
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});


module.exports = userRouter;