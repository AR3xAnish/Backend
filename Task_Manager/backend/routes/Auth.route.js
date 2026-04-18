import express from "express";
const Router = express.Router()
import User from "../models/User.model.js";

Router.post("/register",async (req,res)=>{
  try {
    const {name,email,password} = req.body
    const existing = await User.findOne({email})
    if(existing){
      return res.status(500).json({"message":"Email Exists"})
    }
    if(!name || !email || !password){
      return res.status(400).json({"message":"Cant do"})
    }
    const user = await User.create({name,email,password})
    return res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id)
    })
  } catch (error) {
    return res.status(400).json({"message":error.message})
  }
})

Router.post("/login",async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
      return res.json({"message":"user not found"})
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch){
      return res.json({"message":"Invalid password"})
    }
    return res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email
    })
  } catch (error) {
    return res.status(404).json({"message":error.message})
  }
})

export {Router as AuthRouter}