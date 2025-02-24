import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:5500",
}));

mongoose.connect('mongodb://127.0.0.1:27017/EmployeesSystem').then(() => 
    console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.use((error, req, res, next)=>{
    console.log(error);
    res.json({message: error.message});  
})


app.use(express.json()); //middle ware json data ====> req.body for put ,Post ,patch 


app.use(router);


app.listen(3000,() =>{
    console.log('Server is running on port 3000');
})

