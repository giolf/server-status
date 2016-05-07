define(['serverStatusModule'], function () {
    var app = angular.module('app', ['ui.router', 'serverStatus']);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: "/",
            views: {
                "header": {templateUrl: "views/partials/header.html"},
                "content": {templateUrl: "views/home.html"}
            }
        });

        $stateProvider.state('404', {
            views: {
                "header": {templateUrl: "views/partials/header.html"},
                "content": {templateUrl: "views/page-not-found.html"}
            }
        });

        $urlRouterProvider.otherwise(function($injector){
            $injector.get('$state').go('404');
        });
    }]);
});