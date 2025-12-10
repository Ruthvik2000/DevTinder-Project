const express = require("express");

const app = express();

//Reqest Handler 
app.use("/test",(req,res) => {
    res.send("Hello from the test server");
});

app.use("/",(req,res) => {
    res.send("Hello from the server");
});

app.use("/test/1",(req,res) => {
    res.send("Hello from the test1 server");
});

app.listen(7779, ()=>{
    console.log("Server is successfully listening on port 7779...");
});

//After running the file in terminal with the command "npm run start" ,enter "http://localhost:7779/test" in the chrome
/* If if we "http://localhost:7779/test/anything_written" ---> It sends the "Hello from the server" --> 
After test/ -->whatever we write it gives the same reult */

/* if you enter the "http://localhost:7779/test/1" --> the reult will be /test "Hello from the test server"
because it executes line by line and the test/ will comes first --> So, order of the routes are important.*/