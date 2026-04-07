// const express = require("express")
import express from "express";
import connectDB from "./config/db.config.js"
import { configDotenv } from "dotenv"
import router from "./routes/users.route.js"

configDotenv();
const app = express()
app.use(express.json())

connectDB();


app.use("/users",router)

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));