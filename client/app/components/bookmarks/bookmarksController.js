PBApp.controller('BookmarksController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  $scope.init = function() {
    $scope.getBookmarks();
  }

  $scope.getBookmarks = function() {
    $scope.bookmarks = [];

    $http({
        method: 'GET',
        url: '/api/bookmarks',
    }).then(function (response) {
        $scope.displayBookmarks(response.data.bookmarks);
    });
  }

  $scope.displayBookmarks = function (data) {
    for (var i = 0; i < data.length; i++) {

      data[i].article.excerpt = $sce.trustAsHtml(data[i].article.excerpt);

      // add each bookmark info to bookmarks array
      $scope.bookmarks.push(data[i]);
    }
  }

  $scope.addBookmark = function () {
    var url = $scope.bookmark.url;

    $http({
        method: 'POST',
        url: '/api/bookmarks',
        data: {url: url}
    }).then(function (response) {
        $scope.updateBookmarks(response.data);
        $scope.bookmark.url = '';
    });
  }

  $scope.updateBookmarks = function (data) {
    data.article.excerpt = $sce.trustAsHtml(data.article.excerpt);

    $scope.bookmarks.unshift(data);
  }
}])
