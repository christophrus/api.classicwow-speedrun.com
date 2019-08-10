const express = require('express');

const router = express.Router();

const passport = require('passport');
const authController = require('../controllers/auth');

const bnetAuth = passport.authenticate('bnet');

router.get('/bnet/callback', bnetAuth, authController.bnet);
router.get('/bnet', bnetAuth);

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get('/session', (req, res) => {
  const user = {};

  if (req.isAuthenticated()) {
    user.status = 'loggedIn';
    user.name = req.user.displayName;
  } else {
    user.status = 'loggedOut';
  }

  res.json(user);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.json({ status: 'loggedOut' });
});

module.exports = router;
