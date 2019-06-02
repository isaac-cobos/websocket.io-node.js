const socket= io()

//DOM elements
const message = document.getElementById('message');
const username = document.getElementById('username');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

 btn.addEventListener('click', function (){
    socket.emit('chat:messageClient', {
        username: username.value,
        message: message.value
    });
 });

 message.addEventListener('keypress', function() {
     console.log(username.value);
     socket.emit('chat:typing', username.value);
 })

 socket.on('chat:messageServer', function(data) {
     actions.innerHTML = '';
     output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
     </p>`
 }); 

 socket.on('chat:typing', function(data) {
     actions.innerHTML = `<p><em>${data} is typing a message.</em></p>`
 });