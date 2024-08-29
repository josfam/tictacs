// For serving normal pages

const express = require('express');
const router = express.Router();
const path = require('node:path')

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'landing.html'));
})

router.get('/signup', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
});

router.get('/login', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

router.get('/lobby', async(req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'lobby.html'));
});

// serve api testing page: Nonproduction
router.get('/apitesting', async(req, res) => {
  res.sendFile(path.join(__dirname, '..', 'testing', 'apitesting.html'));
});

module.exports = router;
