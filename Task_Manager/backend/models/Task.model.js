import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  Title:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    trim:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
},{timestamps:true})

const taskModel = mongoose.model("Task",taskSchema)

export {taskModel as Task}