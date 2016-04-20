define(['chartJS', 'serverRequestsModule'], function (chart) {
    var cpuChart = angular.module('cpuChart', ['serverRequests']);

    cpuChart.controller('cpuController', [
        '$scope', '$interval', '$location', '$filter', 'serverRequestsService',
        function ($scope, $interval, $location, $filter, serverRequestsService) {
            // private state
            var loopHandler = null;
            var cpuChart = null;

            // public state
            $scope.model = null;
            $scope.cores = null;
            $scope.clock = null;

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
                        var clockString = data[0].split(" @ ")[1];
                        var clock = '';

                        for (var i = 0; i < clockString.length; i++) {
                            if (clockString.charAt(i) == 'G')
                                clock += ' ' + clockString.charAt(i);
                            else if (clockString.charAt(i) == 'M')
                                clock += ' ' + clockString.charAt(i);
                            else
                                clock += clockString.charAt(i);
                        }

                        $scope.model = data[0].split(" @ ")[0];
                        $scope.clock = clock;
                        $scope.cores = data[1];
                    }
                );

                var cpuCanvas = angular.element(
                    document.querySelector('#cpu-chart')
                )[0].getContext("2d");

                cpuChart = new Chart(cpuCanvas)
                    .Line(data, options);
            };

            var getCpuInfo = function () {
                return serverRequestsService.request("service=infoCPU");
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
                    $filter('date')(new Date(), 'HH:mm:ss')
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
                    stopLoop();
            };

            var stopLoop = function () {
                $interval.cancel(loopHandler);
            };

            var startLoop = function (delay) {
                loopHandler = $interval(cpuLoop, delay);
            };

            // public method
            $scope.init = function (delay) {
                setupCpuChart();
                startLoop(delay);
            };
        }
    ]);
});
