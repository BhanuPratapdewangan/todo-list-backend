
import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/todo-list");

mongoose.connect("mongodb+srv://bhanupratap04123:Dnd8lrlAWOeR59wX@cluster0.kf24ru9.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 15000, })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

