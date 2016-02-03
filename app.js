angular.module('PBApp', [])

.controller('ContentController', function($scope, $http) {

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
        }).then(function successCallback(response) {
            debugger;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            debugger;
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
})