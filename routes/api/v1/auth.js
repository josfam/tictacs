const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../../../models/userModel');

// singup a user
router.post('/signup', async (req, res) => {
  const {username, password } =  req.body;
  try {
    // usernames must be unique
    const existingUser = await User.findOne({ 'username': username });
    if (!existingUser) {
      // hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(200).json({ message: 'Signed up successfully' });
    }
    return res.status(409).json({ message: 'Username already taken!'});
  } catch (error) {
    return res.status(500).json({ message: 'There was a server error', error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(409).json({ message: 'Incorrect username or password' });
    }
    // compare passwords
    const hashedPassword = existingUser.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      return res.status(200).json({ message: 'Logged in successfully!' })
    }
    return res.status(409).json({ message: 'Incorrect username or password' });
  } catch (error) {
    return res.status(500).json({ message: "There was a server error. We can't log you in right now!", error});
  }
});

module.exports = router;
