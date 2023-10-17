import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

//import external files
import './db/config.js';
import todoModel from './db/todo-list.js';

// const connString = 'mongodb+srv://bhanupratap04123:EoqY9DAfgH2Dp7Ot@cluster0.kf24ru9.mongodb.net/?retryWrites=true&w=majority';

const port = process.env.PORT | 1800;
const app = express();

const corsOption = {
    origin: 'https://todo-list-frontend-cw73.onrender.com',
}

app.use(express.json());
app.use(express({ extended: true }));

app.use(cors(corsOption));

// const connectWithRetry = () => {
//     MongoClient.connect(connString, (err, client) => {
//         if (err) {
//             console.error('Failed to connect to MongoDB:', err);
//             setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
//         } else {
//             console.log('Connected to MongoDB');
//             // Continue with your MongoDB operations here
//         }
//     });
// };

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

// app.get('/getdata', async (req, res) => {

//     await MongoClient.connect(connString).then(clietObject => {

//         const database = clietObject.db('todo-list');
//         database.collection('list-data').find({}).toArray().then(document => {
//             res.send(document);
//             res.end();
//         })
//     })
// })

app.get('/getdata', async (req, res) => {

    let data = await todoModel.find();
    if (data) {
        res.send(data);
    } else {
        res.send("Data not found");
    }
})

function verifyToken(req, res, next) {

    let token = req.headers["authorization"];

    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(403).send({ result: "Please enter correct token with headers" });
            } else {
                next();
            }
        })
    } else {
        res.status(401).send({ result: "Please provide token with headers" });
    }
    // console.log("Middleware created...!", token);
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});