const express = require('express');
const router = express.Router();
const User = require('../../../models/userModel');

// get users who are currently online
router.get('/online', async (req, res) => {
  try{
    const users = await User.find({online: true}).select(
      'username online in-game stats -_id');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({message: 'There was a server error. Could not fetch online users'});
  }
});

// exports
module.exports = router;
