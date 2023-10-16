
import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/todo-list");

mongoose.connect("mongodb://localhost:27017/e-com", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

