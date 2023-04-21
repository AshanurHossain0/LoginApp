import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import connect from "./database/connection.js";
import router from "./router/route.js";

const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port=3001;

app.get('/',(req,res)=>{
    res.status(201).json("Home GET Request")
})

app.use('/api',router);

//connecting db
connect().then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`Server connected to port ${port}`);
        })
    }
    catch(error){
        console.log('can not connect to server');
    }
}).catch(err=>{console.log("Invalid db connection");})
