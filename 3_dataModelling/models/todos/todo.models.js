import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subTodos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subTodos"
    }]//Array of SubTodos

},{timestamps:true})

export const Todo = mongoose.model("Todo",todoSchema)