import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

//import external files
import './db/config.js';
// import todoModel from './db/todo-list.js';

const connString = 'mongodb://localhost:27017';

const app = express();

app.use(express.json());
app.use(cors());

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