define([], function () {
    var serverRequests = angular.module('serverRequests', []);

    serverRequests.service('serverRequestsService', function () {
        this.serverRequest = function (param) {
            return "this is my new serverRequest method provided by my new service";
        };
    });
});