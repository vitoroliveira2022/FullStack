const express = require("express");
const app = express();

const server = require('node:http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:3000'}});



const prisma = require('./Client/PrismaClient');
require('dotenv').config();
const cors = require('cors')
const PORT = process.env.PORT || 3004;
app.use(express.json());



app.use(cors())

const createUser = require('../routes/create-user')
const readUsers = require('../routes/read-users');
const login = require('../routes/login-router');
const log = require('../routes/log-router');



app.use('/create', createUser);
app.use('/login', login);
app.use('/read', readUsers);
app.use('/logsearch', log);

// Realizando a conexão com o socket io e verificando o acesso no frontend
io.on('connection', socket => {
    console.log('Usuario conectado!', socket.id);
    socket.on('disconnect', reason => {
        console.log('Usuário desconectado!', socket.id);
    })
    socket.on('set_username', username => {
        socket.data.username = username
        console.log(socket.data.username)
    })
})




   
server.listen(PORT, console.log(`Connected in port: ${PORT}`));

