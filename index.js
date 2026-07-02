const express = require('express');
const http = require('http');
const mongoose = require('mongoose')
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')

// express app
const app = express();

//mongoose connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to mongoDB server');
}).catch(err=>{
    console.log(err)
})

//middlewares
app.use(express.json());

app.use('/user',authRoutes)


//server
const server = http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log("Server is running...")
})