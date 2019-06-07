const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

const PDFParser = require("pdf2json");
const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    const badPinNumber = pdfData.formImage.Pages[0].Texts[23].R[0].T;
    const pinNumber = badPinNumber.replace(/%20/g, '');
    console.log(pinNumber);
});

pdfParser.loadPDF("./docs/CashOnMobile.pdf");

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
