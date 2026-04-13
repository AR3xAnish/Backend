import mongoose from "mongoose";
const dbConnect= async ()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected");
    
  } catch (error) {
    console.log("MongoDB error");
    process.exit(1)
  }
}
export default dbConnect