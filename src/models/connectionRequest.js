const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
    {
    fromUserId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: {
            values:["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
    },
    },
    {
        timestamps: true,
    }
);

//compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

//Whenever we call save method in request.js from routers the pre will exeecute 
//pre is a middleware and we can write many validations,checks, logging, monitoring in the function
connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;
    //Check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You Cannot send connection request to yourself");
    }
    next();
});

// Export the model
const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema); //First parameter is the name of the moedel

module.exports = ConnectionRequest;
