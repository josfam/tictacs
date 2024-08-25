window.onload = function() {
  const doc = document;
  const signupBtn = doc.getElementById('signupbtn');
  const loginBtn = doc.getElementById('loginbtn');

  signupBtn.addEventListener('click', () => {
    window.location.href = '/signup';
  });

  loginBtn.addEventListener('click', () => {
    window.location.href = '/login';
  })
};

