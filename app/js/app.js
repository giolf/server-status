define(['serverStatusModule'], function () {
    var app = angular.module('app', ['ngRoute', 'serverStatus']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html'
        });
        $routeProvider.otherwise({
            templateUrl: 'views/page-not-found.html'
        });
    }]);
});