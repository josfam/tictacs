import {
  listenForLogout,
  ListenForHome,
  showPlayerNamesOnBoard,
  updateInfoBox,
  makeTableArray,
  winnerExists,
  boardIsFull
} from "./common.js";

window.onload = function() {
  const doc = document;
  listenForLogout();
  ListenForHome();

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
  let gameOver = false; // store game over status after every move
  
  console.log(p1, p2, thisP, otherP, thisPMark, otherPMark);
  
  const pairingInfo = {
    thisP,
    otherP,
    'challenger': p1,
    'opponent': p2
  };

  // place player names on the board
  showPlayerNamesOnBoard(thisP, thisPMark, otherP, otherPMark);

  const checkGameOver = function () {
    if (winnerExists(makeTableArray())) {
      socket.emit('game-won', {'winner': thisP, 'opponent': otherP});
      return true;
    }
    if (boardIsFull(makeTableArray())) {
      socket.emit('game-drawn', {thisP, otherP});
      return true;
    }
    return false;
  }

  // x (the challenger) starts first always
  let playerTurn = p1;
  updateInfoBox(`${p1}'s turn!`);
  
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
    gameOver = checkGameOver();

    playerTurn = otherP;
    updateInfoBox(`${otherP}'s turn!`);
    socket.emit('move-made', {thisP, otherP, location, thisPMark, gameOver});
  };

  // attach event listeners to each cell
  const allCells = doc.querySelectorAll('[data-cell]');
  allCells.forEach(cell => {
    cell.addEventListener('click', placeSymbol);
  });

  // update board
  socket.on('update-board', (boardData) => {
    canEditBoard = true;
    const {opponentMark, location, nextTurn, gameOver} = boardData;
    console.log('Received', opponentMark, location);
    const cell = doc.getElementById(location);
    cell.textContent = opponentMark;
    if (gameOver) {
      canEditBoard = false;
      return;
    }

    updateInfoBox(`${nextTurn}'s turn!`);
    gameOver = checkGameOver();
  });
  
  // announce winner
  socket.on('you-won', (player) => {
    updateInfoBox('You won!');
  });
  
  // player lost
  socket.on('you-lost', () => {
    updateInfoBox('You Lost :(');
  });
  
  // announce draw
  socket.on('you-drew', () => {
    updateInfoBox("It's a draw!");
  });
};
