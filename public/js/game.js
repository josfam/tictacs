window.onload = function() {
  const doc = document;
  const socket = io();
  //extract page params
  const urlParams = new URLSearchParams(window.location.search);
  const p1 = urlParams.get('p1');
  const p2 = urlParams.get('p2');
  const thisP = urlParams.get('thisP');
  const otherP = (thisP === p1) ? p2 : p1;
  const room = '';
  const thisPMark = (thisP === p1) ? 'X': 'O';
  const otherPMark = (thisPMark === 'X') ? 'O' : 'X';

  console.log(p1, p2, thisP, otherP, thisPMark, otherPMark);

  const pairingInfo = {
    thisP,
    otherP,
    'challenger': p1,
    'opponent': p2
  };

  // const pairing = (thisP === p1) ? {thisP, otherP} : {otherP, thisP};
  // decide opponent role and place name at the bottom of the board
  socket.emit('game-joined', pairingInfo);
  socket.on('good-luck', (username) => {
    // alert(`good luck ${username}`);
  });

  // place player names on the board
  const thisPNameDiv = doc.getElementById('this-player-name');
  thisPNameDiv.textContent = `${thisP} (${thisPMark})`;

  const otherPIndicator = doc.getElementById('other-player-name')
  otherPIndicator.textContent = `${otherP} (${otherPMark})`;

  // x (the challenger) starts first always
  playerTurn = p1;
  const infoBox = doc.getElementById('info-box');
  infoBox.textContent = `${p1}'s turn!`

  const placeSymbol = function(event) {
    const cell = event.target;
    cell.textContent = 'X';
  };

  // attache event listeners to each cell
  const allCells = doc.querySelectorAll('[data-cell]');
  allCells.forEach(cell => {
    cell.addEventListener('click', placeSymbol);
  });
};
