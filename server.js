var express = require('express');
var request = require('request');
var config = require('./config');
var qs = require('querystring');
var path = require('path');
var app = express();

var accessTokens = {};

app.use(express.static(__dirname + '/public'));

app.get('/api/bookmarks', function (req, res) {
  requestAccessToken(function (err, tokens) {
    accessTokens = tokens;

    requestBookmarks(accessTokens, function (bookmarks) {
      res.send(bookmarks);
    });
  });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

requestAccessToken = function (cb) {
  var conf = config.get(),
      httpOptions = {
        oauth: {
          consumer_key: conf.consumer_key,
          consumer_secret: conf.consumer_secret
        },
        qs: {
          x_auth_username: conf.x_auth_username,
          x_auth_password: conf.x_auth_password,
          x_auth_mode: conf.x_auth_mode,
        }
      };

  request.get('https://www.readability.com/api/rest/v1/oauth/access_token/', httpOptions, function(err, response, body) {
    var tokens = qs.parse(body);
    delete tokens.oauth_callback_confirmed;

    return cb(null, tokens);
  });
}

requestBookmarks = function (tokens, cb) {
  console.log(tokens);
  var conf = config.get(),
      httpOptions = {
        oauth: {
          consumer_key: conf.consumer_key,
          consumer_secret: conf.consumer_secret,
          token: tokens.oauth_token,
          token_secret: tokens.oauth_token_secret
        }
      };

  request.get('https://www.readability.com/api/rest/v1/bookmarks', httpOptions, function(err, response, body) {
    return cb(JSON.parse(body));
  });
}

app.listen(3000, function () {
  console.log('Example');
});