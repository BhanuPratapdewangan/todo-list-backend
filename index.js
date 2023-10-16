import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

//import external files
// import './db/config.js';
// import todoModel from './db/todo-list.js';

const connString = 'mongodb+srv://bhanupratap04123:NaDdENg334CzkJAz@cluster0.kf24ru9.mongodb.net/?retryWrites=true&w=majority';

const app = express();

app.use(express.json());
app.use(cors());

const allowedOrigin = "https://todo-list-frontend-cw73.onrender.com";

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(204); // Pre-flight request. Respond successfully without further processing.
    } else {
        next(); // Continue processing the request.
    }
});

const port = process.env.PORT | 1800;

// Fetch data from database
// app.get('/getdata', async (req, res) => {

//     try {
//         const data = await todoModel.find({});
//         if (data) {
//             res.send(data);
//         } else {
//             res.send({ data: "Data not found" });
//         }
//     } catch (error) {
//         console.error("Error occurred : ", error);
//     }
// });

app.get('/getdata', (req, res) => {

    MongoClient.connect(connString).then(clietObject => {

        const database = clietObject.db('todo-list');
        database.collection('list-data').find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});