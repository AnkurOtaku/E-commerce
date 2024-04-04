import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  buyer:{
    type:mongoose.ObjectId,
    ref:"User",
    required: true
  },
  status:{
    type: String,
    default: "Not processed",
    enum:["Not Processed","Processing","Shipped","Delivered","Cancelled"],
  }
},{timestamps:true});

export default mongoose.model("Order", orderSchema);
