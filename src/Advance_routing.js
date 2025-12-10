
const express = require("express");
const app = express();

//So if I make a call to /abc it will work, and even if I call /ac , it will still work fine, abc or /ac  -> both match
app.get(/ab?c/, (req, res) => {
  res.send({ firstName: "Setty", lastName: "Ruthvik" });
});

// /abcd, /abcbcd, /abcbcbcd ... etc  -> all match
app.get(/a(bc)+d/, (req, res) => {
  res.send({ firstName: "Setty", lastName: "Ruthvik" });
});

app.listen(666, () => {
  console.log("Server is successfully listening on port 666");
});

/*
hit in browser / Postman:

http://localhost:666/abc
http://localhost:666/ac
http://localhost:666/abcd
http://localhost:666/abcbcd   etc.

*/