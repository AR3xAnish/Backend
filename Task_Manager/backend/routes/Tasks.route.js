import express from "express";
import { Task } from "../models/Task.model.js";
import protect from "../middleware/protect.middleware.js";

const Router = express.Router()

Router.get("/",async (req,res)=>{
  try {
    const tasks = await Task.find()
    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

Router.post("/:id",async(req,res)=>{
  try {
    const {Title,description} = req.body;
    if(!Title) return res.status(500).json({"message":"no title given"})
    const id = req.params.id
    const task = await Task.create({
      Title,
      description,
      user:id
    })
    return res.status(200).json({"Message":"Task created successfully"})
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

Router.put("/:id",protect,async (req,res)=>{
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    if(!task) return res.status(404).json({"message":"not found task"})
    if(task.user.toString() !== req.user._id.toString()) return res.status(403).json({"message":"not authrorized"})
    
    const updated = await Task.findByIdAndUpdate(id,req.body,{
      new:true,runValidators:true
    })
    res.status(200).json(updated)
    
  } catch (error) {
    return res.status(500).json(error.message)
  }
})
Router.delete("/:id",protect,async (req,res)=>{
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    if(!task) return res.status(404).json({"message":"not found task"})
    if(task.user.toString() !== req.user._id.toString()) return res.status(403).json({"message":"not authrorized"})
    
    const deleted = await Task.findByIdAndDelete(id)
    res.status(200).json({"deleted":deleted})
    
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

export {Router as taskRouter}