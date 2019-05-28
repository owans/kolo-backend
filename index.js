const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const env = require("./env");

//import routes
const UserRoute = require('./app/routes/userRoute');

const AccountRoute = require('./app/routes/accountRoute');

const app = express();

//connect to mongodb instance
mongoose.connect(env.MONGODB_URL, {useNewUrlParser: true, useCreateIndex: true}).then(()=>{
    console.log('Succesfully connected to mongodb');
}).catch((err)=>{
    console.log('An error occurred while trying to connect to the db', err);
});

//Use CORS middleware
app.use(cors());

//Use logger middleware to log date and time of requests
app.use((req, res,next) => {
    console.log(`[${new Date().toTimeString()}]: ${req.method} ${req.url}`)
    next();
})

app.use(express.urlencoded({extended: false}));

app.use(express.json());

//specify route for users
app.use("/user", UserRoute);

//specify route for user account creation
app.use("/account", AccountRoute);

//connect the server to listen on port
app.listen(env.PORT).on("listening", (err) => {
    if(!err){
        console.log(`Hurray, 😊  App is listening on ${env.PORT}`);
    }
})