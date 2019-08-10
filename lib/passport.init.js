/* eslint-disable consistent-return */
const passport = require('passport');
const { Strategy: BnetStrategy } = require('passport-bnet');
const { BNET_CONFIG } = require('../config');
const User = require('../models/User');

module.exports = () => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => {
    return cb(null, user);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });

  // The callback that is invoked when an OAuth provider sends back user
  const bnetCallback = (accessToken, refreshToken, profile, cb) => {
    process.nextTick(() => {
      User.findOne({ 'bnet.id': profile.id }, (findOneErr, user) => {
        if (findOneErr) {
          return cb(findOneErr);
        }
        if (user) {
          return cb(null, user);
        }
        const newUser = new User({
          displayName: profile.battletag,
          bnet: {
            id: profile.id,
            tag: profile.battletag,
            token: profile.token
          }
        });
        newUser.save(saveErr => {
          if (saveErr) throw saveErr;
          return cb(null, newUser);
        });
      });
    });
  };

  // Adding each OAuth provider's strategy to passport
  passport.use(new BnetStrategy(BNET_CONFIG, bnetCallback));
};
