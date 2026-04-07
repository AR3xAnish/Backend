// const mongoose = require("mongoose")
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is required"],
    trim:true
  },
  age:{
    type:Number,
    required:[true,"Age is required"],
    min:[0,"Age cannot be negative"]
  },
  active:{
    type:Boolean,
    default:true
  }
},{timestamps:true})

const userModel = mongoose.model("User",userSchema);

export default userModel;