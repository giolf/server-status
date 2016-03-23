define(function () {
    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html'
        });
        $routeProvider.otherwise({
            templateUrl: 'views/page-not-found.html'
        });
    }]);
});