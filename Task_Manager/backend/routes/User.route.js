import express from "express";
const Router = express.Router()
import User from "../models/User.model.js";


Router.get("/",async (req,res)=>{
  try {
    const users =await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({"message":error.message})
  }
})

Router.delete("/:id",async(req,res)=>{
  try {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.status(200).json({"message":"user deleted"})
  } catch (error) {
    res.status(404).json({"message":error.message})
  }
})

export {Router as userRouter}

