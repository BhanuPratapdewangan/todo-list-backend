
// import mongoose from "mongoose";

// // mongoose.connect("mongodb://localhost:27017/todo-list");
// // serverSelectionTimeoutMS: 2000,

// mongoose.connect("mongodb+srv://bhanupratap04123:6cgUgOj0nOZm1g7m@cluster0.kf24ru9.mongodb.net/todo-list?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, maxPoolSize:10 })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch(error => {
//         console.error('Error connecting to MongoDB:', error);
//     });

import mongoose from "mongoose";

mongoose.connect("mongodb+srv://bhanupratap04123:6cgUgOj0nOZm1g7m@cluster0.kf24ru9.mongodb.net/todo-list?retryWrites=true&w=majority");

// mongoose.connect("mongodb://localhost:27017/todo-list");

// MONGODB_URL = "mongodb+srv://bhanupratap04123:rieocQN2ePiBBJ5u@cluster0.1j9ymic.mongodb.net/?retryWrites=true&w=majority";



