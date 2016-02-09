PBApp.controller('ArticleController', ['$scope', '$http', '$routeParams', '$sce', '$localStorage', function($scope, $http, $routeParams, $sce, $localStorage) {
    $scope.$routeParams = $routeParams;

    $scope.init = function() {
        $scope.getArticle();
    }

    /**
     * Get an article
     */
    $scope.getArticle = function() {
        var articleId = $scope.$routeParams.articleId,
            localArticle = $localStorage.getObject('article' + articleId);

        // Check if article is already in local storage, if so use that
        if (Object.keys(localArticle).length != 0){
            $scope.displayArticle();
        } else {
            $http({
                method: 'GET',
                url: '/api/article?id=' + articleId,
            }).then(function (response) {
                $localStorage.setObject('article' + $scope.$routeParams.articleId, response.data);
                $scope.displayArticle();
            });
        }
    }

    /**
     * Populate $scope.article with the corresponding article
     */
    $scope.displayArticle = function () {
        var articleId = $scope.$routeParams.articleId,
            localArticle = $localStorage.getObject('article' + articleId);

        $scope.article = localArticle;
        $scope.articleContent = $sce.trustAsHtml(localArticle.content);
    }
}]);
