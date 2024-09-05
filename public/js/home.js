window.onload = async function() {
  const doc = document;
  const computerBtn = doc.getElementById('computerbtn');
  const humanBtn = doc.getElementById('humanbtn');
  // logout and home buttons
  const logoutBtn = doc.getElementById('logout-btn');
  let playerName = '';

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

  const getUserName = async function () {
    const response = await fetch('/api/v1/users/username', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const info = await response.json();
    if (response.ok) {
      console.log('response is:', response);
    } else {
      alert(response.json().message);
      return;
    }
    return info.username;
  }

  playerName = await getUserName();

  computerBtn.addEventListener('click', async (event) => {
    window.location.href = `/computerGame?p1=${playerName}&p1Mark=X&p2=computron&p2Mark=O`;
  });

  humanBtn.addEventListener('click', async (event) => {
    window.location.href = '/lobby';
  });
}
