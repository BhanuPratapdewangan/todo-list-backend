
import express from 'express';
import cors from 'cors';
import Jwt from 'jsonwebtoken';
import retry from 'retry';

// import js files
import { } from './db/config.js';
import userModel from './db/users.js';
import todoModel from './db/todo-list.js';

const app = express();
const port = process.env.PORT || 3800;
const jwtKey = "todo-list";

// Middleware
// app.use(urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const allowedOrigin = "https://todo-list-frontend-cw73.onrender.com/";

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(204); // Pre-flight request. Respond successfully without further processing.
    } else {
        next();  // Continue processing the request.
    }
});


// app.get('/users', verifyToken, async (req, res) => {

//     let data = await userModel.find();
//     if (data) {
//         res.send(data);
//     } else {
//         res.send("Data not found");
//     }
// })

// //Get todo-list 
// app.get('/getdata', verifyToken, async (req, res) => {

//     let data = await todoModel.find();
//     if (data) {
//         res.send(data);
//     } else {
//         res.send("Data not found");
//     }
// })

// //SignUp Route 
// app.post('/signup', async (req, res) => {
//     try {
//         let data = new userModel(req.body);
//         data = await data.save();
//         data = data.toObject();
//         delete data.password;
//         res.send(data);
//         res.end();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// //SignIn Route
// app.post('/signin', async (req, res) => {

//     if (req.body.email && req.body.password) {

//         let data = await userModel.findOne(req.body).select('-password');

//         if (data) {
//             Jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
//                 if (err) {
//                     res.send({ result: "Data went wrong" });
//                 } else
//                     res.send({ data, auth: token });
//             })
//         } else {
//             res.send("Result : Data not found");
//         }
//     } else {
//         res.send("Data Not Found");
//     }
// });


// ...

app.post('/signup', async (req, res) => {
    try {
        // Define the operation with retry logic
        const operation = retry.operation({
            retries: 3,  // Number of retries
            factor: 2,  // Exponential backoff factor
            minTimeout: 1000,  // Minimum retry delay in milliseconds
            maxTimeout: 5000,  // Maximum retry delay in milliseconds
        });

        operation.attempt(async (currentAttempt) => {
            try {
                let data = new userModel(req.body);
                data = await data.save();
                data = data.toObject();
                delete data.password;
                res.send(data);
                res.end();
            } catch (error) {
                if (operation.retry(error)) {
                    // If there's an error and we should retry, log the attempt and retry
                    console.log(`Attempt ${currentAttempt}: Insert failed, retrying...`);
                    return;
                }
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


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

// Listen server on port number 3800
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});