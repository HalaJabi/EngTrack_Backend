const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connection=require('./db');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const jobRoute = require('./routes/job');
const bookmarkRoute = require('./routes/bookmark');
const chatRoute = require('./routes/chat');
const mongoose = require('mongoose');
const messageRoute = require('./routes/messages');
const projectRoute = require('./routes/project');
const QuizRoute=require('./routes/quiz');
const RequestFormRoute=require('./routes/requestform');
const Task=require('./routes/task');
const notificationRouter = require('./routes/notificationRouter');
const app = express();
app.use(express.json());

dotenv.config();
connection();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/', authRoute);
app.use('/api/users', userRoute);
app.use('/api/jobs', jobRoute);
app.use('/api/bookmarks', bookmarkRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);
app.use('/api/project', projectRoute);
app.use('/api/Quiz', QuizRoute);
app.use('/api/Form', RequestFormRoute);
app.use('/api/Task', Task);

app.use('/api/notifications', notificationRouter);
//app.use("/api", movieRoutes);


//app.listen(process.env.PORT || 8001,console.log('Server is running'))
const port = 8000


const server = app.listen(port, () => console.log(` app listening on port ${port}!`))

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        // host the server for communication or use ngrok to use this to communicate with multiple devices
        //origin: "https://a821-159-138-45-185.ngrok-free.app"
       origin:"http://192.168.1.21:8000"
      // origin:"http://192.168.1.20:8000"
        //92.168.0.107
    }
});

io.on("connection", (socket) => {
    console.log("connected to sockets");

    socket.on('setup', (userId) => {
        socket.join(userId);
        socket.broadcast.emit('online-user', userId)
        console.log(userId);
    });


    socket.on('typing', (room) => {
         console.log("typing");
         console.log("room");
        socket.to(room).emit('typing', room)
    });


    socket.on('stop typing', (room) => {
         console.log("stop typing");
        console.log("room");
        socket.to(room).emit('stop typing', room)
    });


    socket.on('join chat', (room) => {
        socket.join(room)
         console.log('User Joined : ' + room);
    });

    socket.on('new message', (newMessageReceived) => {

        var chat = newMessageReceived.chat;
        var room = chat._id;

        var sender = newMessageReceived.sender;

        if (!sender || sender._id) {
             console.log('Sender not defined');
            return;
        }

        var senderId = sender._id;
        console.log(senderId + "message sender");
        const users = chat.users;

        if (!users) {
        console.log("Users not defined");
            return;
        }

        socket.to(room).emit('message received', newMessageReceived);
        socket.to(room).emit('message sent', "New Message");
    });


    socket.off('setup', () => {
     console.log('user offline');
        socket.leave(userId)
    })


})















