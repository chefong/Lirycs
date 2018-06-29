const express = require('express');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const app = express();

app.listen(5000, () => {
  console.log('Listening on port 5000...');
});

app.get('/', (req, res) => {
  res.send('Working');
});

app.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-private']
}));