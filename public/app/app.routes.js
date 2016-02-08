PBApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "app/components/bookmarks/bookmarksView.html",
      controller: "BookmarksController"
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});