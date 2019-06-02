const express = require("express")
const path = require('path');
const app = express();


//SETTINGS
app.set('port', process.env.PORT || 3000);

//Here Static Files(html, css)
app.use(express.static(path.join(__dirname, 'public')));

 
//Start the server 
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));  
})

//Websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:messageClient', (data) => {
        console.log(data)
        io.sockets.emit('chat:messageServer', data)
    })

    socket.on('chat:typing', (data) => {
       socket.broadcast.emit('chat:typing', data);
    })

});

