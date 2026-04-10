import express from "express"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

const router = express.Router()

const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "7d"});
}

router.post("/register",async (req,res)=>{
  try {
    const {name,email,password} = req.body;
    const existingUser = await userModel.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"Email already in use"})
    }
    const user = await userModel.create({name,email,password})
    return res.status(200).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id)
    })
  } catch (error) {
    //return res.status(400)
    return res.status(400).json({message:error.message})
    // return res.statusCode(400).json({message:error.message})
  }
} )

router.post("/login",async(req,res)=>{
  try {
    const {email,password}=req.body;
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(401).json({message:"Invalid Email or Password"})
    }
    const isMatch = await user.matchPassword(password)
    if(!isMatch){
      return res.statusCode(401).json({message:"Invalid email or password"})
    }
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id)
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

export {router as authRoutes}
