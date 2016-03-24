define(['chartJS'], function(chart) {
    var cpuChart = angular.module('cpuChart', []);

    cpuChart.controller('cpuController', ['$scope', function ($scope) {
        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            }]
        };
        var options = {
            responsive: true,
            maintainAspectRatio: true
            // scaleOverride : true,
            // scaleSteps : 10,
            // scaleStepWidth : 10,
            // scaleStartValue : 0
        }

        var canvas = angular.element(
            document.querySelector('#cpu-chart')
        )[0].getContext("2d");

        var cpuChart = new Chart(canvas).Line(data, options);
    }]);
});
