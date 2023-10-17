import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    id : Number,
    title : String,
    completed : Boolean
})

const todoModel = mongoose.model("list-data", todoSchema);

export default todoModel;