const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/api/user", (req, res) => {
  res.send({ name: "igor" });
});

app.listen(3000, () => {
  console.log("Server run on 3000 port");
});
