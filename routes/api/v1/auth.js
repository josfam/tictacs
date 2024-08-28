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

      // save user info in the session store
      req.session.userId = newUser._id; 
      req.session.username = newUser.username;
      newUser.online = true;
      newUser.save();
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
      // save user info in the session store
      req.session.userId = existingUser._id;
      req.session.username = existingUser.username;
      existingUser.online = true;
      existingUser.save();
      return res.status(200).json({ message: 'Logged in successfully!' })
    }
    return res.status(409).json({ message: 'Incorrect username or password' });
  } catch (error) {
    return res.status(500).json({ message: "There was a server error. We can't log you in right now!", error});
  }
});

router.post('/logout', async (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    try {

      const user = await User.findById(userId);
      if (user) {
        user.online = false;
        await user.save();
      }
    } catch (error) {
      res.status(500).json({message: "Couldn't update your details. Failed to logout. Try again"})};
  }

  // remove session from db store
  req.session.destroy(error => {
    if (error) {
      return res.status(500).json({message: "Couldn't log you out. Try again"});
    }
    return res.status(200).json({message: "Logged out successfully"});
  });

  // remove cookie from the client
  res.clearCookie('connect.sid')

});

module.exports = router;
