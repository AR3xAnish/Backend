// const express = require("express")
import express from "express";
import connectDB from "./config/db.config.js"
import { configDotenv } from "dotenv"
import { authRoutes } from "./routes/auth.route.js";
import { noteRoutes } from "./routes/notes.route.js";

configDotenv();

const app = express()
app.use(express.json())
connectDB();
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use("/users",router)

// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// const PORT = process.env.PORT;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));