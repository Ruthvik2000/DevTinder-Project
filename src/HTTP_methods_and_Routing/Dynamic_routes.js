/* 
If you have a URL like
http://localhost:7777/user/707
you can handle it using route parameters
*/

const express = require("express");
const app = express();

app.get("/user/:userId", (req, res) => {
 console.log(req.params);
 res.send({ firstName: "Setty", lastName: "Ruthvik" });
});


/*
when you make an API call and check the terminal, you’ll see { userId: '707' } .
You can also make more complex routes using multiple parameters:
*/
/* 
If you have a URL like
http://localhost:7777/user/707/abc/password
you can handle it using route parameters
*/
app.get("/user/:userId/:name/:password", (req, res) => {
 console.log(req.params);
 res.send({ firstName: "Setty", lastName: "Ruthvik" });
});

app.listen(7777, () => {
 console.log("Server is successfully listening on port 7777");
});
