const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

const getUsers = require('./controllers/sockets/user/getUsers');
const createUser = require('./controllers/sockets/user/createUser');
const sendEmail = require('./controllers/sockets/email/sendEmail');

io.on('connection', (socket) => {
   console.log(`${socket.id} connect!`);
   socket.on('disconnect', () => {
       console.log(`${socket.id} disconnect!`);
   });

    getUsers(socket);
    createUser(socket);
    sendEmail(socket);
});

server.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Listening on  5000...');
});
