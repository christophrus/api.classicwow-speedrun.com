const providers = ['bnet'];

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `https://classicwow-speedrun.com/auth/${provider}/callback`
    : `http://localhost:5000/auth/${provider}/callback`;
});

const [bnetURL] = callbacks;

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'https://classicwow-speedrun.com'
    : ['http://127.0.0.1:3000', 'http://localhost:3000'];

exports.BNET_CONFIG = {
  clientID: process.env.BNET_KEY,
  clientSecret: process.env.BNET_SECRET,
  callbackURL: bnetURL,
  region: 'us',
  scope: 'wow.profile'
};
