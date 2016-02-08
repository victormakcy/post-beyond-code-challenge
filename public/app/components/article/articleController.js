PBApp.controller('ArticleController', ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
  $scope.$routeParams = $routeParams;

  $scope.init = function() {
    $scope.getArticle();
  }

  $scope.getArticle = function() {
    var articleId = $scope.$routeParams.articleId;

    $http({
        method: 'GET',
        url: '/api/article?id=' + articleId,
    }).then(function (response) {
      $scope.displayArticle(response.data);
    });
  }

  $scope.displayArticle = function (data) {
    $scope.article = data;
    $scope.articleContent = $sce.trustAsHtml(data.content);
  }
}])
