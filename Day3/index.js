import express from 'express';
import fs from 'fs';
import employeeRouter from './routes/employee.js';

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.json()); //middle ware json data ==> req.body for put ,Post ,patch 

app.use(express.urlencoded({ extended: true })); // middleware Allow Xform data

app.use(employeeRouter);

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(3000,() =>{
    console.log('Server is running on port 3000');
})

