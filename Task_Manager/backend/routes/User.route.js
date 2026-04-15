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

export {Router as userRouter}

