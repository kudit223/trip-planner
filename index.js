const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const {Server} = require('socket.io')
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const  socketConnection  = require('./sockets/chatSocket');
const cors = require('cors')
const socketAuth = require('./middlewares/socketAuth')

// express app
const app = express();

//mongoose connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to mongoDB server');
}).catch(err=>{
    console.log(err)
})

//middlewares
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());




// routes
app.use('/user',authRoutes)
app.use('/room',roomRoutes)

//server
const server = http.createServer(app);

// socket.io server
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        credentials:true
    }
});

io.use(socketAuth)

io.on('connection',(socket) => socketConnection(io, socket))

//server running 
server.listen(process.env.PORT,()=>{
    console.log("Server is running...")
})