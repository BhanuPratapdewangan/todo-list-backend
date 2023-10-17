
import express from 'express'
import cors from 'cors';
import { MongoClient } from 'mongodb';

//import external files/ connection files
import { } from './db/config.js';
// import todoModel from './db/todo-list.js';

const port = process.env.PORT | 1800;

const connString = 'mongodb+srv://bhanupratap04123:yLwfk5Yn2KcluSgP@cluster0.kf24ru9.mongodb.net/todo-list?retryWrites=true&w=majority';
// const connString = "mongodb://localhost:27017";
const app = express();

// const corsOption = {
//     origin: 'https://todo-list-frontend-cw73.onrender.com',
// }


app.use(express());
app.use(cors());
// app.use(cors(
//     {
//         origin: 'https://todo-list-frontend-cw73.onrender.com', // Specify the allowed origin
//         methods: 'GET,POST,PUT,DELETE', // Specify the allowed HTTP methods
//         allowedHeaders: 'Content-Type,Authorization',
//     }
// ));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// app.get('/getdata', async(req, res) => {

//     let data = await todoModel.find();
//     if(data){
//         res.send(data); 
//     } else {
//         res.send({result : "Data not found"});
//     }
// })


app.get('/getdata', async (req, res) => {

    await MongoClient.connect(connString).then(clietObject => {

        const database = clietObject.db('todo-list');
        database.collection('list-data').find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


