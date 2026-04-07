// const mongoose = require("mongoose")
import mongoose from "mongoose";
const connectDB= async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB connected");
    
  } catch (error) {
    console.log("Failed to connect MONGODB");
    console.log(error);
    
    process.exit(1)
    
  }
  
}

export default connectDB;