define(function () {
    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/server-status.html'
                })
                .otherwise({
                    templateUrl: 'views/page-not-found.html'
                });
        }
    ]);
});