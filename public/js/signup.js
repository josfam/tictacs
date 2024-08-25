window.onload = function() {
  const doc = document;
  const form = doc.getElementById('signup');
  
  form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = doc.getElementById('username').value;
    const password = doc.getElementById('password').value;

    if (!username || !password){
      alert('Username or password missing');
      return;
    }

    const response = await fetch('api/v1/auth/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();

    if (response.ok)
    {
      alert(info.message);
    } else {
      alert(info.message);
    }
  });
}
