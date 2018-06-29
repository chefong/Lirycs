const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./credentials');

passport.use(
  new SpotifyStrategy({
    clientID: keys.spotify.clientID,
    clientSecret: keys.spotify.clientSecret,
    callbackURL: 'http://localhost:3000/callback'
  }, () => {

  })
);