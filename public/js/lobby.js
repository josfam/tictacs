import {
  listenForLogout
} from './common.js'

window.onload = function() {
  const doc = document;
  listenForLogout();

  // socket io events
  const socket = io();

  let thisUsername = ''; // this user is themselves a prospect challenger

  socket.on('get-your-name', (username) => {
    thisUsername = username;
    const pageHeading = doc.querySelector('.page-heading');
    const originalText = pageHeading.textContent;
    if (!(originalText.includes(username))) {
      pageHeading.textContent = `${originalText} (${username})`;
    };
  });

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
      listButton.classList.add('btn-cta-primary', 'btn-cta-primary-outlined');
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
      const newPlayerRow = getPlayerRowInLobby(username, 'challenge')
      if (!(thisUsername === username)){
        playersOnlineList.appendChild(newPlayerRow);
      }
    }
  });

  socket.on('player-joined', (player) => {
    const { username } = player;
    if (!(username === thisUsername)) {
      const newPlayerItem = getPlayerRowInLobby(username, 'challenge');
      playersOnlineList.appendChild(newPlayerItem);
    }
  });

  socket.on('player-left', (username) => {
    // remove the logged out player from this user's dom
    removePlayerFromLobby(username);
  });

  // being challenged by another player
  socket.on('challenged-to-a-game', (opponent) => {
    alert(`You have been challenged to a game! by ${opponent}`)
    window.location.href = `/game?p1=${opponent}&p1Mark=X&p2=${thisUsername}&p2Mark=O&thisP=${thisUsername}`;
  });

  // challenging another player
  socket.on('challenging-to-a-game', (opponent) => {
    window.location.href = `/game?p1=${thisUsername}&p1Mark=X&p2=${opponent}&p2Mark=O&thisP=${thisUsername}`;
  });

  // challenging a player
  doc.addEventListener('click', (event) => {
    const clickedBtn = event.target;
    if (clickedBtn.classList.contains('challengeBtn')) {
      const challenger = thisUsername;
      const opponent = clickedBtn.id;
      // emit a challenge event to web socket
      socket.emit('challenge-issued', { challenger, opponent });
    }
  });
};
