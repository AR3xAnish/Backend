import express from "express";
import { configDotenv } from "dotenv"
import dbConnect from "./config/db.config.js";
import { AuthRouter } from "./routes/Auth.route.js";

configDotenv()

const app = express()

app.use(express.json());
dbConnect()

app.use("/auth",AuthRouter)
app.listen(3000,()=>{
  console.log("Running on port 3000");
})