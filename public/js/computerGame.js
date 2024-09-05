import {
  listenForLogout,
  ListenForHome,
  makeTableArray,
  updateInfoBox,
  winningCombos,
  showPlayerNamesOnBoard,
  updateCell,
  checkGameOver,
} from "./common.js";

window.onload = function() {
  const doc = document;
  listenForLogout();
  ListenForHome();

  //extract page params
  const urlParams = new URLSearchParams(window.location.search);
  const humanName = urlParams.get('p1');
  const compName = urlParams.get('p2');
  const humanMark = 'X';
  const compMark = 'O';
  let canEditBoard = true;
  let gameOver = false;
  
  showPlayerNamesOnBoard(humanName, humanMark, compName, compMark);
  console.log(humanName, humanMark, compName, compMark);

  // x (the challenger) starts first always
  let playerTurn = humanName;
  updateInfoBox(`You first!`);

  const placeSymbol = function (event, player) {
    if (player === compName) {
      makeComputerMove(compMark);
    }
    else {
      makeHumanMove(event);
    }
  }

  // attach event listeners to each cell
  const allCells = doc.querySelectorAll('[data-cell]');
  allCells.forEach(cell => {
    cell.addEventListener('click', placeSymbol);
  });

  const makeComputerMove = function (compMark, event) {
    // place the computer symbol
    const board = makeTableArray();
    const emptySpots = [];
    for (const [idx, item] of board.entries()) {
      if (item === '') {
        emptySpots.push(idx);
      }
    }
    // choose a random empty spot to place the computer mark
    const emptyIndex = Math.floor(Math.random() * emptySpots.length);
    const boardIndex = emptySpots[emptyIndex];
    updateCell(boardIndex, 'O');
    gameOver = checkGameOver();
    if (gameOver) {
      alert('Game Over!');
      return;
    }
    updateInfoBox(`🤖 | 👤`);
    canEditBoard = true;
  };

  const makeHumanMove = function (event) {
    if (!canEditBoard) {
      alert("It's the computer's turn!");
      return;
    }

    const cell = event.target;
    if (cell.textContent){
      return;
    }

    updateCell(Number(cell.id), humanMark);
    canEditBoard = false;
    gameOver = checkGameOver();
    if (gameOver) {
      alert('Game Over!');
      return;
    }

    playerTurn = compName;
    updateInfoBox(`🤖 | 👤`);
    makeComputerMove();
  };

  const predictMove  = function (grid, player){
    for (row in winningCombos) {
      [a, b, c] = row;
      if (grid[a] === player && grid[b] === player && !grid[c]) {
        return c;
      } else if (grid[a] === player && !grid[b] && grid[c] === player) {
        return b;
      } else if (!grid[a] && grid[b] === player && grid[c] === player) {
        return a;
      }
    }
    return;
    }

  const computerMove = (grid) => {
    let move = checkForWinningMove(grid, 'O');
    if (move !== null) {
      return move;
    }
    move = checkForWinningMove(grid, 'X');
    if (move !== null) {
      return move;
    }
    return grid.findIndex(cell => cell === null);
  };
};
