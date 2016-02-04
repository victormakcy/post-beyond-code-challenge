var PBApp = angular.module('PBApp', []);

PBApp.controller('BookmarksController', ['$scope', '$http',
    function($scope, $http) {

        getAccessToken();

        function getAccessToken() {
            var httpMethod = 'GET',
                url = 'https://www.readability.com/api/rest/v1/oauth/access_token/',
                timestamp = Date.now(),
                parameters = {
                    oauth_consumer_key: 'victormakcy',
                    oauth_nonce: 'kllo9940pd9333jh',
                    oauth_timestamp: timestamp,
                    oauth_signature_method: 'HMAC-SHA1',
                    oauth_version: '1.0',
                    x_auth_username: 'victormakcy',
                    x_auth_password: '123456',
                    x_auth_mode: 'client_auth'
                },
                consumerSecret = '5feEMqAWPmCqwS9BHsHME6dck9zEP5GL',
                // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
                encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret);

            parameters.oauth_signature = encodedSignature;

            $http({
                method: 'JSONP',
                url: url,
                params: parameters
            }).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        function getBookmarks() {
            $scope.bookmarks = [];

            $http({
                method: 'jsonp',
                url: 'https://www.readability.com/api/rest/v1/bookmarks',
                params: parameters
            }).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        $scope.displayBookmarks = function (data) {
            for (var i = 0; i < data.length; i++) {
 
                // add each bookmark info to bookmarks array
                $scope.bookmarks.push({
                    // specific data to go here
                });
            }
        }
    }])
