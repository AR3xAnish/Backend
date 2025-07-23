import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required: true
    }
})


const orderSchema = new mongoose.Schema({
    orderprice:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:{
        type: [orderItemSchema] //gets multiple orders 
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:"PENDING"
    }
},{timestamps:true})

export const Order = mongoose.models("Order",orderSchema)