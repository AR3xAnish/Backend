// const mongoose = require("mongoose")
import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is required"],
    trim:true
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    trim:true,
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    require:[true,"password is required"],
    minlength:6
  }
},{timestamps:true})

userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword,this.password);
};

const userModel = mongoose.model("User",userSchema);

export default userModel;