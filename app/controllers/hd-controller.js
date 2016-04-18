define(['chartJS', 'serverRequestsModule'], function (chart) {
    var hdChart = angular.module('hdChart', ['serverRequests']);

    hdChart.controller('hdController', [
        '$scope', '$interval', '$location', '$filter', 'serverRequestsService',
        function ($scope, $interval, $location, $filter, serverRequestsService) {
            // private state
            var loopHandler = null;
            var hdChart = null;

            // public state
            $scope.total = null;
            $scope.current = null;
            $scope.remain = null;
            $scope.percentage = null;

            // private methods
            var setupHdChart = function () {
                var options = {
                    responsive: true,
                    maintainAspectRatio: true,
                    scaleOverride: true
                };

                var hdCanvas = angular.element(
                    document.querySelector('#hd-chart')
                )[0].getContext("2d");

                hdChart = new Chart(hdCanvas)
                    .Pie([], options);

            };

            var getCurrentHdValues = function () {
                return serverRequestsService
                    .request("service=usageHD");
            }

            var setCurrentHdValues = function (data) {
                $scope.total = $filter('number')(data[1] / 1000, 2) + " GB";
                $scope.current = $filter('number')(data[2] / 1000, 2) + " GB";
                $scope.remain = $filter('number')(data[3] / 1000, 2) + " GB";
                var currentHD = data[4].split('%')[0];
                var remainingHD = 100 - currentHD;

                if (hdChart.segments.length < 2) {
                    hdChart.addData({
                        value: currentHD,
                        color: "#F7464A",
                        highlight: "#FF5A5E",
                        label: "Memoria utilizzata"
                    });
                    hdChart.addData({
                        value: remainingHD,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "Memoria libera"
                    });
                    stopLoop();
                    startLoop(10000);

                }
                else {
                    hdChart.segments[0].value = currentHD;
                    hdChart.segments[1].value = remainingHD;
                    hdChart.update();
                }
            };

            var hdLoop = function () {
                if ($location.path() == "/") {
                    getCurrentHdValues().then(
                        function (data) {
                            setCurrentHdValues(data);
                        }
                    );
                }
                else
                    stopLoop();
            };

            var stopLoop = function () {
                $interval.cancel(loopHandler);
            };

            var startLoop = function (delay) {
                loopHandler = $interval(hdLoop, delay);
            };

            // public methods
            $scope.init = function (delay) {
                setupHdChart();
                startLoop(delay);
            }
        }
    ]);
});
