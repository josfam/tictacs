window.onload = function() {
  const doc = document;
  const logoutBtn = doc.getElementById('logoutbtn');
  // socket io events
  const socket = io();

  logoutBtn.addEventListener('click', async (e) => {
    const response = await fetch('/api/v1/auth/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }});
    const info = await response.json();
    if (response.ok) {
      socket.emit('logout');
      alert(info.message);
      window.location.href = '/';
    } else {
      alert(info.message);
    }
  });

  socket.on('get-your-name', (username) => {
    playerName = username;
    const pageHeading = doc.querySelector('.page-heading');
    const originalText = pageHeading.textContent;
    if (!(originalText.includes(username))) {
      pageHeading.textContent = `${originalText} (${username})`;
    };
  });

  const liveLobby = doc.getElementById('live-lobby');
  const playersOnlineList = doc.getElementById('players-online');

  const getPlayerRowInLobby = function (username, buttonText) {
      const newPlayerItem = doc.createElement('li');
      newPlayerItem.classList.add('player-row');

      const usernameDiv = doc.createElement('div');
      usernameDiv.classList.add('username');
      usernameDiv.textContent = username;
      newPlayerItem.appendChild(usernameDiv);

      // button
      const listButton = doc.createElement('button');
      listButton.classList.add(`${buttonText}Btn`);
      listButton.id = username;
      listButton.textContent = buttonText;
      newPlayerItem.appendChild(listButton);
      return newPlayerItem;
  };

  const removePlayerFromLobby = function (username) {
    const playerLists = playersOnlineList.getElementsByClassName('player-row');
    for (const listItem of playerLists) {
      const usernameDiv = listItem.querySelector('.username');
      if (usernameDiv.textContent === username) {
        usernameDiv.parentNode.parentNode.removeChild(listItem);
      }
    }
  }

  // get a list of all online players
  socket.on('get-players-online', (players) => {
    //clear the current lobby
    playersOnlineList.textContent = '';
    for (const username of players) {
      const newPlayerRow = getPlayerRowInLobby(username, 'Challenge')
      playersOnlineList.appendChild(newPlayerRow);
    }
  });

  socket.on('player-joined', (player) => {
    const newPlayerItem = getPlayerRowInLobby(player.username, 'Challenge');
    playersOnlineList.appendChild(newPlayerItem);
  });

  socket.on('player-left', (username) => {
    // remove the logged out player from this user's dom
    removePlayerFromLobby(username);
  });
};
