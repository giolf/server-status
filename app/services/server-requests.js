define([], function () {
    var serverRequests = angular.module('serverRequests', []);

    serverRequests.service('serverRequestsService', ['$http', '$q', function ($http, $q) {
        this.request = function (param) {
            var serverAddress = "http://192.168.0.109/server-status-web-service/client.php";
            var deferred = $q.defer();
            
            $http.get(serverAddress + '?' + param).then(
                function success(objData) {
                    deferred.resolve(objData.data);
                },
                function error(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };
    }]);
});