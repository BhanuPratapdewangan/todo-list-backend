
import express from 'express';
import cors from 'cors';
import Jwt from 'jsonwebtoken';

// import js files
import { } from './db/config.js';
import userModel from './db/user.js';
import todoModel from './db/todo-list.js';

const app = express();
const port = process.env.PORT || 3800;
const jwtKey = "todo-list";

// Middleware
// app.use(urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get('/users', verifyToken,  async(req, res) => {

    let data = await userModel.find();
    if(data)
    {
        res.send(data);
    } else{
        res.send("Data not found");
    }
})

//Get todo-list 
app.get('/getdata', verifyToken,  async(req, res) => {

    let data = await todoModel.find();
    if(data)
    {
        res.send(data);
    } else{
        res.send("Data not found");
    }
}) 

//SignUp Route 
app.post('/signup', async (req, res) => {
    try {
        let data = new userModel(req.body);
        data = await data.save();
        data = data.toObject();
        delete data.password;
        res.send(data);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//SignIn Route
app.post('/signin', async (req, res) => {

    if (req.body.email && req.body.password) {

        let data = await userModel.findOne(req.body).select('-password');

        if (data) {
            Jwt.sign({ data }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Data went wrong" });
                } else
                    res.send({ data, auth: token });
            })
        } else {
            res.send("Result : Data not found");
        }
    } else {
        res.send("Data Not Found");
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