import io from 'socket.io-client'

var socket = io("http://localhost:3000");

var form = document.getElementById('form');
var input = document.getElementById('input');
const subutton = document.getElementById('btn')
const messages = document.getElementById('messages')
const rooms = document.getElementById('rooms')
const roomconnection = document.getElementById('connectbtn')

socket.on('connect', () =>{
  displayMessage(socket.id)
})

subutton.addEventListener('click', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value, rooms.value);
    displayMessage(input.value)
    input.value = '';
    
  }
});

roomconnection.addEventListener('click', (e) =>{
    e.preventDefault()
    socket.emit('join-room',rooms.value)
})


function displayMessage(message){

    var item = document.createElement('li')
    item.textContent = message
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

socket.on('receive message', function(msg) {
  displayMessage(msg)
});