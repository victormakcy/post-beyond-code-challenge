PBApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/components/bookmarks/bookmarksView.html",
            controller: "BookmarksController"
        })
        .when('/article/:articleId', {
            templateUrl: "/app/components/article/articleView.html",
            controller: 'ArticleController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
