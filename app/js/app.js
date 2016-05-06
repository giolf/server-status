define(['serverStatusModule'], function () {
    var app = angular.module('app', ['ui.router', 'serverStatus']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: "/",
            templateUrl: "views/home.html"
        });
        $stateProvider.state('page-not-found', {
            templateUrl: "views/page-not-found.html"
        });
        $urlRouterProvider.otherwise(function($injector){
            $injector.get('$state').go('page-not-found');
        });
    }]);
});