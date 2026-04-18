import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  }
},{timestamps:true})

userSchema.pre("save",async (next)=>{
  if(!this.isModified(password))
    return next();
  this.password = await bcrypt.hash(password)
})

userSchema.methods.matchPassword = async(enteredPassword)=>{
  return await bcrypt.compare(enteredPassword,this.password)
}
const User = mongoose.model("User",userSchema)

export default User;