import express from "express";
const Router = express.Router()
import User from "../models/User.model";


Router.get("/",(req,res)=>{
  try {
    const users = User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({"message":error.message})
  }
})