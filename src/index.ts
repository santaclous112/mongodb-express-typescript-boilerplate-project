import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import users from "./api/users";
import cors from "cors";
const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors()); // Use this after the variable declaration

mongoose
  .connect("mongodb://127.0.0.1:27017/my_database")
  .then(() => console.log("MongoDB Connected!!!!!"));

app.use("/api/users", users);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
