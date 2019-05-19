const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const env = require("./env");

//import routes
const UserRoute = require('./app/routes/userRoute');
const AccountRoute = require('./app/routes/accountRoute');

//connect to an express instance
const app = express();

//connect to mongodb instance
mongoose.connect(env.MONGODB_URL).then(()=>{
    console.log('Succesfully connected to mongodb');
}).catch((err)=>{
    console.log('An error occurred while trying to connect to the db', err);
})

//Use CORS middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json);

//Use logger middleware to log date and time of requests
app.use((req, res,next) => {
    console.log(`[${new Date().toTimeString()}]: ${req.method} ${req.url}`)
    next();
})

app.use('/user', UserRoute);
app.use('/account', AccountRoute);

//connect the server to listen on port
app.listen(env.PORT).on("listening", (err) => {
    if(!err){
        console.log(`Hurray, 😊  App is listening on ${env.PORT}`);
    }
})