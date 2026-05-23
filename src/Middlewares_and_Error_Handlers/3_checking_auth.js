const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./2_Authentication_Middleware");

app.get("/admin", adminAuth, (req, res) => {
  res.send("Admin route authorized ✅");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Send ✅");
});

// ✅ 404 handler (UNKNOWN routes like /as)
app.use((req, res) => {
  res.status(404).send("Something went wrong");
});

// ✅ Error handler (only when next(err) / throw happens)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});

app.listen(7889, () => {
  console.log("Server listening on 7889");
});
