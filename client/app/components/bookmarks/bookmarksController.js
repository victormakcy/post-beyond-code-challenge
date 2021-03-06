PBApp.controller('BookmarksController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
    $scope.init = function() {
        $scope.isLoading = true;
        $scope.bookmarks = [];
        $scope.getBookmarks();
    }

    /**
     * Should we show the bookmarks empty state view
     */
    $scope.showEmptyState = function () {
        debugger;
        return !$scope.isLoading && $scope.bookmarks.length == 0 ? true : false;
    }

    /**
     * Get all bookmarks associated with the user
     */
    $scope.getBookmarks = function() {
        $http({
            method: 'GET',
            url: '/api/bookmarks',
        }).then(function (response) {
            $scope.isLoading = false;
            $scope.displayBookmarks(response.data.bookmarks);
        });
    }

    /**
     * Populate $scope.bookmarks array with all the bookmarks
     */
    $scope.displayBookmarks = function (data) {
        for (var i = 0; i < data.length; i++) {
            // Enable sce for the article excerpt and allow html binding
            data[i].article.excerpt = $sce.trustAsHtml(data[i].article.excerpt);
            $scope.bookmarks.push(data[i]);
        }
    }

    /**
     * Get a url to bookmarks
     */
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

    /**
     * Populate $scope.bookmarks array with the new bookmark
     */
    $scope.updateBookmarks = function (data) {
        // Enable sce for the article excerpt and allow html binding
        data.article.excerpt = $sce.trustAsHtml(data.article.excerpt);
        $scope.bookmarks.unshift(data);
    }
}]);
