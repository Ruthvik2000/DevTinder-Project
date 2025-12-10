const express = require("express");

const app = express();

//Reqest Handler 
app.use("/tset",(req,res) => {
    res.send("Hello from the server");
});

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000...");
});
