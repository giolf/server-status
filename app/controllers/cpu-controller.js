define(['chartJS', 'serverRequestsModule'], function(chart) {
    var cpuChart = angular.module('cpuChart', ['serverRequests']);

    cpuChart.controller('cpuController', ['$scope', '$interval', 'serverRequestsService',
        function ($scope, $interval, serverRequestsService) {
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
                    maintainAspectRatio: true
                    // scaleOverride : true,
                    // scaleSteps : 10,
                    // scaleStepWidth : 10,
                    // scaleStartValue : 0
                };

                var CpuCanvas = angular.element(
                    document.querySelector('#cpu-chart')
                )[0].getContext("2d");

                cpuChart = new Chart(CpuCanvas)
                    .Line(data, options);
            };

            var getCurrentCpuValue = function() {

            };

            var cpuLoop = function() {
                var promise = serverRequestsService
                    .request("service=usageCPU");

                promise.then(function(data) {
                    console.log(data);
                }) ;
            };

            $scope.init = function(start) {
                if (start) {
                    setupCpuChart();
                    loopHandler = $interval(cpuLoop, 1);
                }
            }

            $scope.stop = function() {
                $interval.cancel(loopHandler);
            }
        }
    ]);
});
