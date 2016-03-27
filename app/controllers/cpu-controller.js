define(['chartJS'], function(chart) {
    var cpuChart = angular.module('cpuChart', []);

    cpuChart.controller('cpuController', ['$scope', '$interval', function ($scope, $interval) {
        var loopHandler = null;
        var cpuChart = null;
        var count = 0;

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
            console.log("get current cpu value");
        };

        $scope.init = function(start) {
            if (start) {
                setupCpuChart();
                loopHandler = $interval(cpuLoop, 1000);
            }
        }

        $scope.stop = function() {
            $interval.cancel(loopHandler);
        }
    }]);
});
