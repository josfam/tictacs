const doc = document;

export const getUsername = async function () {
  const response = await fetch('/api/v1/users/username',{
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
  });
  const info = await response.json();
  if (response.ok) {
    return info.username;
  } else {
    alert(info.message);
  }
}

export const addUsernameToLobbyHeader = function (username) {
    const pageHeading = doc.querySelector('.page-heading');
    const originalText = pageHeading.textContent;
    if (!(originalText.includes(username))) {
      pageHeading.textContent = `${originalText} (${username})`;
    };
};

export const listenForLogout = function () {
  /** Attaches an event listener to the logout button, and logs the user out
   * should the button be clicked.
   */
  const logoutBtn = doc.getElementById('logout-btn');
  logoutBtn.addEventListener('click', async () => {
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
};

export const ListenForHome = function () {
  /** Attaches an event listener to the home button, and takes the user home,
   * should the button be clicked.
   */
  const homeBtn = doc.getElementById('home-btn');
  homeBtn.addEventListener('click', () => {
    window.location.href = '/home';
  });
};


export const makeTableArray = function () {
  /** Takes the current state of the table, and returns it as a one-d array
  with each entry containing either an 'X', 'O' or ''
  */
  // start with null
  const table = Array(9).fill(null);
  const cells = doc.querySelectorAll('#game-board td');
  cells.forEach(cell => {
    const cellId = Number(cell.id);
    const mark = cell.textContent
    table[cellId] = mark;
  });
  return table;
};

export const updateInfoBox = function (text) {
  /** Updates the game's info box with the provided text */
  const infoBox = doc.getElementById('info-box');
  infoBox.textContent = text;
};


export const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const winnerExists = function (grid) {
  console.log('Checking winner exists: ', grid); // DEBUG
  /** Checks if a player has won the game */
  for (const row of winningCombos) {
    console.log(row); // DEBUG
    const [a, b, c] = row;
    if (grid[a] !== '' && grid[a] === grid[b] && grid[a] === grid[c]) {
      return 1;
    }
  }
  return 0;
};

export const boardIsFull = function (grid) {
  console.log('Checking board is full', grid); // DEBUG
  /** Checks if the board is full */
  for (const spot of grid) {
    if (grid[spot] !== 'X' && grid[spot] !== 'O') {
      return 0;
    }
  }
  return 1;
};

export const checkGameOver = function () {
  /** Whether the game is over. The game is over if there is a winner, or if there is none */
  const winPresent = winnerExists(makeTableArray());
  const drawPresent = boardIsFull(makeTableArray());
  console.log('winPresent: ', winPresent, 'drawPresent: ', drawPresent);
  if (drawPresent || winPresent) {
    return true;
  }
  return false;
};

export const showPlayerNamesOnBoard = function (thisPName, thisPMark, otherPName, otherPMark) {
  // place player names on the board
  const thisPNameDiv = doc.getElementById('this-player-name');
  thisPNameDiv.textContent = `${thisPName} (${thisPMark})`;

  const otherPNameDiv = doc.getElementById('other-player-name')
  otherPNameDiv.textContent = `${otherPName} (${otherPMark})`;
};

export const updateCell = function (location, mark) {
  /** Puts the provided mark into the cell in the provided location */
  const cells = doc.querySelectorAll('#game-board td');
  for (const cell of cells) {
    console.log('Cell obj:', cell);
    console.log('Cell ID:', cell.id, 'Location:', location);
    if (Number(cell.id) === location) {
      cell.textContent = mark;
      break;
    }
  }
};
