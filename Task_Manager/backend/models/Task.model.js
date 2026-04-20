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
  },
  priority:{
    type:String,
    enum:["low","mid","high"],
    required:true,
    default:"mid"
  },
  status:{
    type:String,
    enum:["to-do","in-progress","completed"],
    required:true,
    default:"to-do"
  },
  deadline:{
    type:Date
  }
},{timestamps:true})

const taskModel = mongoose.model("Task",taskSchema)

export {taskModel as Task}