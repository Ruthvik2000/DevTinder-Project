const express = require("express");

const app= express();

//app.use("/route", rH --> Route header, [rH2, rH3], rH4); -->next() will execute for all evene in the list
//Rapping routes inside the array doesnot disturb anything
app.use("/test",(req,res,next)=>{
    //res.send("1st Response");
    console.log("Handling the route user!!")
    next();
    },
    [(req,res,next)=>{
    //res.send("2st Response");
    console.log("Handling the route user 2!!")
    next();
    },
    (req,res,next)=>{
    //res.send("3st Response");
    console.log("Handling the route user 3!!")
    next();
    }],
    (req,res,next)=>{
    console.log("Handling the route user 4!!")
    res.send("4rth Response");
    
});

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777...");
});
