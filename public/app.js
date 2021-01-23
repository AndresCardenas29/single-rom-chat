const socket = io();

// DOM elements
const output = document.querySelector('.output');
const actions = document.querySelector('.actions');
const username = document.querySelector('.username');
const message = document.querySelector('.message');
const btn = document.querySelector('.send');
const chat = document.querySelector('.chat');
let nitificacion = new Audio('/assets/sound/note.mp3');

btn.addEventListener('click', () => {
  socket.emit('chat:message', {
    message: message.value,
    username: username.value
  });

  actions.innerHTML = '';
  message.value = '';
});

message.addEventListener('keypress', e => {
  socket.emit('chat:typing', username.value);
  if (e.key == "Enter") {
    socket.emit('chat:message', {
      message: message.value,
      username: username.value
    });
    actions.innerHTML = '';
    message.value = '';
    gotoBottom();
  }
});

socket.on('chat:message', (data) => {
  output.innerHTML += `<p>
      <strong>${data.username}</strong>: ${data.message}
  </p>`;
  nitificacion.play();
  gotoBottom();
});

socket.on('chat:typing', (username) => {
  actions.innerHTML = `<p><em>${username} esta escribiendo un mensaje...</em></p>`;
  gotoBottom();
});

function gotoBottom(){
  chat.scrollTop = chat.scrollHeight - chat.clientHeight;
}
