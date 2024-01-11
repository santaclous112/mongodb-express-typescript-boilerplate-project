const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require("cors");
app.use(cors()); // Use this after the variable declaration

const mongoose = require("mongoose");
// const router = express.Router();
const users = require("./src/api/users");

mongoose
  .connect("mongodb://127.0.0.1:27017/my_database")
  .then(() => console.log("MongoDB Connected!!!!!"));

app.get("/test", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", users);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
