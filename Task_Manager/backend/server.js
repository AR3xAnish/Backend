import express from "express";
import { configDotenv } from "dotenv"
import dbConnect from "./config/db.config.js";
import { AuthRouter } from "./routes/Auth.route.js";
import { userRouter } from "./routes/User.route.js";
import { taskRouter } from "./routes/Tasks.route.js";
import { adminRouter } from "./routes/Admin.route.js";

configDotenv()

const app = express()

app.use(express.json());
dbConnect()

app.use("/auth",AuthRouter)
app.use("/user",userRouter)
app.use("/tasks",taskRouter)
app.use("/admin",adminRouter)

app.listen(3000,()=>{
  console.log("Running on port 3000");
})