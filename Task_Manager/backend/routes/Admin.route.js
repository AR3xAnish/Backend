import express from "express";
import isAdmin from "../middleware/isAdmin.middleware.js";
import User from "../models/User.model.js";
import { Task } from "../models/Task.model.js";
import protect from "../middleware/protect.middleware.js";

const Router = express.Router()

Router.get("/users",protect,isAdmin,async(req,res)=>{
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

Router.get("/tasks",protect,isAdmin,async(req,res)=>{
  try {
    const tasks = await Task.find().populate("user","name email")
    if(!tasks){
      return res.status(404).json({"message":"Not found tasks"})
    }
    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

Router.delete("/users/:id",protect,isAdmin,async(req,res)=>{
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

Router.delete("/tasks/:id",protect,isAdmin,async (req,res)=>{
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    if(!task) return res.status(404).json({"message":"not found task"})
    const deleted = await Task.findByIdAndDelete(id)
    res.status(200).json({"deleted":deleted})
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

export {Router as adminRouter}