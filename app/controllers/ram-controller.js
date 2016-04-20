define(['chartJS', 'serverRequestsModule'], function (chart) {
    var ramChart = angular.module('ramChart', ['serverRequests']);

    ramChart.controller('ramController', [
        '$scope', '$interval', '$location', '$filter', 'serverRequestsService',
        function ($scope, $interval, $location, $filter, serverRequestsService) {
            // private state
            var loopHandler = null;

            // public state
            $scope.total = null;
            $scope.current = null;
            $scope.free = null;
            $scope.perc = null;

            // private methods
            var setupRamChart = function () {
                var data = {
                    labels: [],
                    datasets: [{
                        label: "RAM Chart",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: []
                    }]
                };

                var options = {
                    responsive: true,
                    maintainAspectRatio: true,
                    scaleShowVerticalLines: false,
                    scaleLabel: "<%=value%> %",
                    scaleOverride: true,
                    scaleSteps: 5,
                    scaleStepWidth: 20,
                    scaleStartValue: 0
                };

                var ramCanvas = angular.element(
                    document.querySelector('#ram-chart')
                )[0].getContext("2d");

                ramChart = new Chart(ramCanvas)
                    .Line(data, options);
            };

            var getCurrentRamValues = function () {
                return serverRequestsService
                    .request("service=usageRAM");
            };

            var setCurrentRamValue = function (data) {
                if (ramChart.datasets[0].points.length > 10)
                    ramChart.removeData();

                $scope.total = $filter('number')(data[0] / 1000, 2) + " GB";
                $scope.current = $filter('number')(data[1] / 1000, 2) + " GB";
                $scope.free = $filter('number')(data[2] / 1000, 2) + " GB";
                $scope.perc = data[3];
                ramChart.addData(
                    [$filter('number')(100 / data[0] * data[1], 1)],
                    $filter('date')(new Date(), 'HH:mm:ss')
                );
            };

            var ramLoop = function () {
                if ($location.path() == "/") {
                    getCurrentRamValues().then(
                        function (data) {
                            setCurrentRamValue(data);
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
                loopHandler = $interval(ramLoop, delay);
            };

            // public method
            $scope.init = function (delay) {
                setupRamChart();
                startLoop(delay)
            };
        }
    ]);
});