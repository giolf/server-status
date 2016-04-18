define(['chartJS', 'serverRequestsModule'], function (chart) {
    var cpuChart = angular.module('cpuChart', ['serverRequests']);

    cpuChart.controller('cpuController', [
        '$scope', '$interval', '$location', '$filter', 'serverRequestsService',
        function ($scope, $interval, $location, $filter, serverRequestsService) {
            // private state
            var loopHandler = null;
            var cpuChart = null;

            // public state
            $scope.modelCPU = null;
            $scope.numCores = null;

            // private methods
            var setupCpuChart = function () {
                var data = {
                    labels: [],
                    datasets: [{
                        label: "CPU Chart",
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

                getCpuInfo().then(
                    function (data) {
                        $scope.modelCPU = data[0];
                        $scope.numCores = data[1];
                    }
                );

                var cpuCanvas = angular.element(
                    document.querySelector('#cpu-chart')
                )[0].getContext("2d");

                cpuChart = new Chart(cpuCanvas)
                    .Line(data, options);
            };

            var getCpuInfo = function() {
                return serverRequestsService.
                    request("service=infoCPU");
            }

            var getCurrentCpuValues = function () {
                return serverRequestsService
                    .request("service=usageCPU");
            };

            var setCurrentCpuValues = function (data) {
                if (cpuChart.datasets[0].points.length > 10)
                    cpuChart.removeData();

                cpuChart.addData(
                    [data[0] + data[1] + data[2]],
                    $filter('date')(new Date(),'HH:mm:ss')
                );
            };

            var cpuLoop = function () {
                if ($location.path() == "/") {
                    getCurrentCpuValues().then(
                        function (data) {
                            setCurrentCpuValues(data);
                        }
                    );
                }
                else
                    stop();
            };

            var stop = function () {
                $interval.cancel(loopHandler);
            };

            // public method
            $scope.init = function () {
                setupCpuChart();
                loopHandler = $interval(cpuLoop, 3000);
            };
        }
    ]);
});
