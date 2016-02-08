var PBApp = angular.module('PBApp', []);

PBApp.controller('BookmarksController', ['$scope', '$http', function($scope, $http) {

  $scope.init = function() {
    $scope.getBookmarks();
  }

  $scope.getBookmarks = function() {
      $scope.bookmarks = [];
       var httpMethod = 'POST',
          url = 'https://www.readability.com/api/rest/v1/bookmarks',
          timestamp = Date.now(),
          oauth = {
            oauth_consumer_key: 'victormakcy',
            oauth_nonce: 'kllo9940pd9333jh',
            oauth_timestamp: timestamp,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0',
            oauth_token: '6Sk6ATeW5mXKKbjVDg',
            oauth_token_secret: 'g3jxNbgUM8Rb7pmHPEhKf3gPcLNwkBXt'
          };
          consumerSecret = '5feEMqAWPmCqwS9BHsHME6dck9zEP5GL',
          encodedSignature = oauthSignature.generate(httpMethod, url, oauth, consumerSecret);
          oauth.oauth_signature = encodedSignature;

      $http({
          method: 'POST',
          url: url,
          params: oauth,
      }).then(function (success) {
          console.log(success.data);
          // this callback will be called asynchronously
          // when the response is available
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
