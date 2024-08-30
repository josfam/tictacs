window.onload = function() {
  const doc = document;
  //extract page params
  const urlParams = new URLSearchParams(window.location.search);
  const player1 = urlParams.get('player1');
  const player2 = urlParams.get('player2');
  const thisPlayer = urlParams.get('thisPlayer');
  const room = urlParams.get('roomName');
  
  const socket = io();
  
  // decide opponent role and place name at the bottom of the board
  socket.emit('game-joined', thisPlayer);
  socket.on('good-luck', (username) => {
    alert(`good luck ${username}`);
  });

  // place player names on the board
  const thisPlayerIndicator = doc.getElementById('this-player-name');
  thisPlayerIndicator.textContent = thisPlayer;
  const otherPlayer = (thisPlayer === player1) ? player2 : player1;
  const otherPlayerIndicator = doc.getElementById('other-player-name')
  otherPlayerIndicator.textContent = otherPlayer; 
};
