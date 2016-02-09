var express = require('express');
var request = require('request');
var qs = require('querystring');
var path = require('path');
var config = require('./config');
var app = express();
var bodyParser = require('body-parser'); //Used to parse the body of POST requests
app.use(bodyParser.json()); // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies

/**
 * Express Configurations
 */
app.use(express.static(__dirname + '/client'));

/**
 * Get all bookmarks request definition
 */
app.get('/api/bookmarks', function (req, res) {
    requestAccessToken(function (err, tokens) {
        requestBookmarks(tokens, function (bookmarks) {
        res.send(bookmarks);
        });
    });
});

/**
 * Add a bookmark request definition
 */
app.post('/api/bookmarks', function (req, res) {
    var url = req.body.url;

    requestAccessToken(function (err, tokens) {
        requestAddBookmark(url, tokens, function (newBookmark) {
            res.send(newBookmark);
        })
    });
});

/**
 * Get an article request definition
 */
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


/**
 * Authenticate a user with Readability's XAuth endpoint
 * @param {Function} cb
 */
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

/**
 * Get all bookmarks
 * @param {Object} tokens
 * @param {Function} cb
 */
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

/**
 * Add a bookmark
 * @param {String} url
 * @param {Object} tokens
 * @param {Function} cb
 */
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

/**
 * Get a bookmark
 * @param {String} id
 * @param {Object} tokens
 * @param {Function} cb
 */
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

/**
 * Get an article
 * @param {String} articleId
 * @param {Object} tokens
 * @param {Function} cb
 */
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

// Start listening
app.listen(3000, function () {
    console.log('Post Beyond Code Challenge');
});
