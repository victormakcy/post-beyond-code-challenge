var express = require('express');
var request = require('request');
var qs = require('querystring');
var path = require('path');
var config = require('./config');
var app = express();
var bodyParser = require('body-parser'); //Used to parse the body of POST requests
app.use(bodyParser.json()); // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies

app.use(express.static(__dirname + '/client'));

app.get('/api/bookmarks', function (req, res) {
    requestAccessToken(function (err, tokens) {
        requestBookmarks(tokens, function (bookmarks) {
        res.send(bookmarks);
        });
    });
});

app.post('/api/bookmarks', function (req, res) {
    var url = req.body.url;

    requestAccessToken(function (err, tokens) {
        requestAddBookmark(url, tokens, function (newBookmark) {
            res.send(newBookmark);
        })
    });
});

app.get('/api/article', function (req, res) {
    var articleId = req.query.id;

    requestAccessToken(function (err, tokens) {
        requestArticle(articleId, tokens, function (article) {
            res.send(article);
        });
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'));
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

requestAddBookmark = function (url, tokens, cb) {
    var conf = config.get(),
        httpOptions = {
            oauth: {
                consumer_key: conf.consumer_key,
                consumer_secret: conf.consumer_secret,
                token: tokens.oauth_token,
                token_secret: tokens.oauth_token_secret
            },
            form: {
                url: url
            }
        };

    request.post('https://www.readability.com/api/rest/v1/bookmarks', httpOptions, function(err, response, body) {
        var id = response.headers.location.match(/bookmarks\/(\d*)$/)[1];

        requestBookmark(id, tokens, cb);
    });
}

requestBookmark = function (id, tokens, cb) {
    var conf = config.get(),
        httpOptions = {
            oauth: {
                consumer_key: conf.consumer_key,
                consumer_secret: conf.consumer_secret,
                token: tokens.oauth_token,
                token_secret: tokens.oauth_token_secret
            }
        };

    request.get('https://www.readability.com/api/rest/v1/bookmarks/' + id, httpOptions, function(err, response, body) {
        return cb(JSON.parse(body));
    });
}

requestArticle = function (articleId, tokens, cb) {
    var conf = config.get(),
        httpOptions = {
            oauth: {
                consumer_key: conf.consumer_key,
                consumer_secret: conf.consumer_secret,
                token: tokens.oauth_token,
                token_secret: tokens.oauth_token_secret
            }
        };

    request.get('https://www.readability.com/api/rest/v1/articles/' + articleId, httpOptions, function(err, response, body) {
        return cb(JSON.parse(body));
    });
}

app.listen(3000, function () {
    console.log('Post Beyond Code Challenge');
});
