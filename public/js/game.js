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
  let canEditBoard = true;

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
  let playerTurn = p1;
  const infoBox = doc.getElementById('info-box');
  infoBox.textContent = `${p1}'s turn!`

  // make move
  const placeSymbol = function(event) {
    if (!canEditBoard) {
      alert("Wait your turn!");
      return;
    }

    const cell = event.target;
    if (cell.textContent){
      return;
    }
    cell.textContent = thisPMark;
    const location = this.dataset.cell;
    canEditBoard = false;

    playerTurn = otherP;
    infoBox.textContent = `${otherP}'s turn!`

    socket.emit('move-made', {thisP, otherP, location, thisPMark});
  };

  // attach event listeners to each cell
  const allCells = doc.querySelectorAll('[data-cell]');
  allCells.forEach(cell => {
    cell.addEventListener('click', placeSymbol);
  });

  // update board
  socket.on('update-board', (boardData) => {
    canEditBoard = true;
    const {opponentMark, location, nextTurn} = boardData;
    console.log('Received', opponentMark, location);
    const cell = doc.getElementById(location);
    cell.textContent = opponentMark;
    infoBox.textContent = `${nextTurn}'s turn!`
  });

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const makeTableArray = function () {
    
  }
};
