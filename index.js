const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = 4199;

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/kolodb').then(()=>{
    console.log('Succesfully connected to mongodb');
}).catch((err)=>{
    console.log('An error occurred while trying to connect to the db', err);
})


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json);

app.use((req, res,next) => {
    console.log(`[${new Date().toTimeString()}]: ${req.method} ${req.url}`)
    next();
})

app.listen(port).on("listening", (err) => {
    if(!err){
        console.log(`Hurray, 😊 App is listening on ${port}`);
    }
})