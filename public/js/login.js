window.onload = function() {
  const doc = document;
  const form = doc.getElementById('login');
  
  form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const username = doc.getElementById('username').value;
    const password = doc.getElementById('password').value;

    if (!username || !password){
      alert('Username or password missing');
      return;
    }

    const response = await fetch('api/v1/auth/login', {
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
      window.location.href ='/home';
    } else {
      alert(info.message);
    }
  });
}
