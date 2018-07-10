let express = require('express');
let request = require('request');
let querystring = require('querystring');
let app = express();

const keys = require('./config/credentials');

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5000/auth/spotify/callback';

app.get('/auth/spotify', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: keys.spotify.clientID,
      scope: 'user-read-private user-read-email user-top-read',
      redirect_uri
    }))
})

app.get('/auth/spotify/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        keys.spotify.clientID + ':' + keys.spotify.clientSecret
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

let port = process.env.PORT || 5000;
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`);
app.listen(port);