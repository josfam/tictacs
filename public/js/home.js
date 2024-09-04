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
}
