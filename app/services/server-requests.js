define([], function () {
    var serverRequests = angular.module('serverRequests', []);

    serverRequests.service('serverRequestsService', ['$http', '$q', function ($http, $q) {
        this.request = function (param) {
            var serverAddress = "http://192.168.1.123/status-server/client.php";
            var deferred = $q.defer();
            
            $http.get(serverAddress + '?' + param).then(
                function success(data) {
                    deferred.resolve(data);
                },
                function error(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };
    }]);
});