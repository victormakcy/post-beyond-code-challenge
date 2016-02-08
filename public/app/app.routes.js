PBApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "app/components/bookmarks/bookmarksView",
      controller: "bookmarksController"
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});