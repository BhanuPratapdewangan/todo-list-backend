
import express from 'express'
import cors from 'cors';


//import external files/ connection files
import { } from './db/config.js';
import todoModel from './db/todo-list.js';

const port = process.env.PORT | 1800;

const app = express();

const corsOption = {
    origin: 'https://todo-list-frontend-cw73.onrender.com',
}

app.use(express());
app.use(cors(corsOption));

app.get('/getdata', async(req, res) => {

    let data = await todoModel.find();
    if(data){
        res.send(data); 
    } else {
        res.send({result : "Data not found"});
    }
})

app.listen(port ,() => {
    console.log(`Server started on port ${port}`);
})


