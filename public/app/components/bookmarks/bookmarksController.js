PBApp.controller('BookmarksController', ['$scope', '$http', function($scope, $http) {

  $scope.init = function() {
    $scope.getBookmarks();
  }

  $scope.getBookmarks = function() {
    $scope.bookmarks = [];

    $http({
        method: 'GET',
        url: '/api/bookmarks',
    }).then(function (response) {
      debugger;
        $scope.displayBookmarks(response.data.bookmarks);
    });
  }

  $scope.displayBookmarks = function (data) {
    for (var i = 0; i < data.length; i++) {

      // add each bookmark info to bookmarks array
      $scope.bookmarks.push(data[i]);
    }
  }
}])
