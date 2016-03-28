define(['chartJS', 'serverRequestsModule'], function (chart) {
    var cpuChart = angular.module('cpuChart', ['serverRequests']);

    cpuChart.controller('cpuController', ['$scope', '$interval', '$location', 'serverRequestsService',
        function ($scope, $interval, $location, serverRequestsService) {
            var loopHandler = null;
            var cpuChart = null;

            var setupCpuChart = function () {
                var data = {
                    labels: [],
                    datasets: [{
                        label: "My First dataset",
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
                    scaleOverride: true,
                    scaleSteps: 10,
                    scaleStepWidth: 10,
                    scaleStartValue: 0
                };

                var CpuCanvas = angular.element(
                    document.querySelector('#cpu-chart')
                )[0].getContext("2d");

                cpuChart = new Chart(CpuCanvas)
                    .Line(data, options);
            };

            var getCurrentCpuValue = function () {
                return serverRequestsService
                    .request("service=usageCPU");
            };

            var setCurrentCpuValue = function (data) {
                cpuChart.addData(
                    [data[0] + data[1] + data[2]],
                    "re"
                );
            };

            var cpuLoop = function () {
                if ($location.path() == "/") {
                    getCurrentCpuValue().then(
                        function (data) {
                            setCurrentCpuValue(data);
                        }
                    );
                }
                else
                    stop();
            };

            var stop = function () {
                $interval.cancel(loopHandler);
            };

            $scope.init = function () {
                setupCpuChart();
                loopHandler = $interval(cpuLoop, 3000);
            };
        }
    ]);
});
