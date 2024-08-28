window.onload = function() {
  const doc = document;
  const logoutBtn = doc.getElementById('logoutbtn');

  logoutBtn.addEventListener('click', async (e) => {
    const response = await fetch('/api/v1/auth/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }});
    const info = await response.json();
    if (response.ok) {
      alert(info.message);
      window.location.href = '/';
    } else {
      alert(info.message);
    }
  });

  // socket io events
  const socket = io();
};
