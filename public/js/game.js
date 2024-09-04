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
  let gameOver = false; // store game over status after every move
  
  console.log(p1, p2, thisP, otherP, thisPMark, otherPMark);
  
  const pairingInfo = {
    thisP,
    otherP,
    'challenger': p1,
    'opponent': p2
  };
  
  // place player names on the board
  const thisPNameDiv = doc.getElementById('this-player-name');
  thisPNameDiv.textContent = `${thisP} (${thisPMark})`;
  
  const otherPIndicator = doc.getElementById('other-player-name')
  otherPIndicator.textContent = `${otherP} (${otherPMark})`;
  
  const updateInfoBox = function (text) {
    const infoBox = doc.getElementById('info-box');
    infoBox.textContent = text;
  };

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
  const infoBox = doc.getElementById('info-box');
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
    // start with null
    const table = Array(9).fill(null);
    const cells = doc.querySelectorAll('#game-board td');
    cells.forEach(cell => {
      const cellId = Number(cell.id);
      const mark = cell.textContent
      table[cellId] = mark;
    });
    console.log(table);
    return table;
  }
  
  const winnerExists = function (grid) {
    for (row of winningCombos) {
      [a, b, c] = row;
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return row;
      }
    }
    return 0;
  };

  const boardIsFull = function (grid) {
    for (spot in grid) {
      if (grid[spot] === "") {
        return 0;
      }
    }
    return 1;
  }
  // logout and home buttons
  const logoutBtn = doc.getElementById('logout-btn');
  const homeBtn = doc.getElementById('home-btn');
  
  logoutBtn.addEventListener('click', async (event) => {
    const response = await fetch('/api/v1/auth/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      alert('Logged out successfully');
      window.location.href = '/';
    } else {
      alert(response.message);
    }
  });

  homeBtn.addEventListener('click', async (event) => {
    window.location.href = "/home";
  });
};
