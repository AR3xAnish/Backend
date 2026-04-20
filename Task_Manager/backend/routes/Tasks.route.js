import express from "express";
import { Task } from "../models/Task.model.js";
import protect from "../middleware/protect.middleware.js";

const Router = express.Router()

Router.get("/",protect,async (req,res)=>{
  try {
    // const tasks = await Task.find()
    const filter = {user: req.user._id}
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    if(req.query.status) 
      filter.status = req.query.status
    if(req.query.priority) 
      filter.priority = req.query.priority
    if(req.query.search)
      filter.Title = {$regex:req.query.search,$options:"i"}
    const tasks = await Task.find(filter)
    .skip((page-1)*limit)
    .limit(Number(limit))
    
    const total = await Task.countDocuments(filter)


    return res.status(200).json({
      total,
      page:Number(page),
      pages: Math.ceil(total/limit),
      tasks
    })
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

Router.post("/:id",protect,async(req,res)=>{
  try {
    const {Title,description,priority,status,deadline} = req.body;
    if(!Title) return res.status(500).json({"message":"no title given"})
    const id = req.params.id
    const task = await Task.create({
      Title,
      description,
      user:id,
      status,
      priority,
      deadline
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