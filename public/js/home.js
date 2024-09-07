import {
  getUsername,
  listenForLogout
} from './common.js'

window.onload = async function() {
  const doc = document;
  listenForLogout();
  const computerBtn = doc.getElementById('computerbtn');
  const humanBtn = doc.getElementById('humanbtn');
  // logout and home buttons
  const logoutBtn = doc.getElementById('logout-btn');
  let playerName = '';

  playerName = await getUsername();

  // Place username in greeting
  const playerGreetingDiv = doc.getElementById('player-greeting')
  playerGreetingDiv.textContent = `Hello ${playerName}.`;
  const questionDiv = doc.getElementById('game-style-question');
  questionDiv.textContent = `How do you want to play today?`;

  computerBtn.addEventListener('click', async (event) => {
    window.location.href = `/computerGame?p1=${playerName}&p1Mark=X&p2=computron&p2Mark=O`;
  });

  humanBtn.addEventListener('click', async (event) => {
    window.location.href = '/lobby';
  });
}
