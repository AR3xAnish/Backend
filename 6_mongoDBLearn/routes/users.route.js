// const express = require("express")
import express from "express";
const router = express.Router();

import userModel from "../models/user.model.js";

router.get("/",async(req,res)=>{
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get("/:id",async(req,res)=>{
  try {
    const user = await userModel.findById(req.params.id)
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post("/",async(req,res)=>{
  try {
    const user = new userModel(req.body)
    const savedUser = await user.save()
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

router.put("/:id",async(req,res)=>{
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true,runValidators:true}
    );
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.json(user)
    
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})


router.delete("/:id",async(req,res)=>{
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    res.json({ message: "User deleted" })
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})


export default router;