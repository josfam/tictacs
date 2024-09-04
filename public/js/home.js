window.onload = function() {
  const doc = document;
  const computerBtn = doc.getElementById('computerbtn');
  const humanBtn = doc.getElementById('humanbtn');

  computerBtn.addEventListener('click', async (event) => {
      window.location.href = '/computerGame';
  });

  humanBtn.addEventListener('click', async (event) => {
      window.location.href = '/lobby';
  });

  // logout and home buttons
  const logoutBtn = doc.getElementById('logout-btn');
  
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
}
