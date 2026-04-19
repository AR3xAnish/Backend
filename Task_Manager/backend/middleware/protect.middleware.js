import jwt from "jsonwebtoken"
import User from "../models/User.model.js";

const protect = async (req,res,next) =>{
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token,process.env.TOKEN_STRING)
    req.user = await User.findById(decoded.id).select("-password")
    next();
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

export default protect