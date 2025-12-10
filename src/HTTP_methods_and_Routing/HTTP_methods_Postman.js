const express = require("express");

const app=express();


app.get("/user", (req, res) => {
    res.send({firstname:"Setty",lastname:"Ruthvik" });
});  // This .get("/user") method will only match "GET" API Calls to the router

app.post("/user", (req, res) => {
    //saving data to db
    res.send("Data sucessfullt saved in the database");
}); 

app.delete("/user",(req,res) => {
    res.send("Deleted Successfully");
});

//Reqest Handler 
app.use("/test",(req,res) => {
    res.send("Hello from the test server");
});                   // This .use() method will get all the HTTP methods( GET, PUT, PUSH, etc___) to the "/test"

app.listen(8999, ()=>{
    console.log("Server is successfully listening on port 8999...");
});