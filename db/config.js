
import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/todo-list");

mongoose.connect("mongodb+srv://bhanupratap04123:yLwfk5Yn2KcluSgP@cluster0.kf24ru9.mongodb.net/todo-list?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 15000, })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

