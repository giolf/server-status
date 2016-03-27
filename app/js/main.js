require.config({
    baseUrl: '../bower_components',

    paths: {
        appModule: '../app/js/app',
        cpuChartModule: '../app/controllers/cpu-controller',
        serverStatusModule: '../app/js/server-status',
        serverRequestsModule: '../app/services/server-requests',
        angular: 'angular/angular.min',
        ngRoute: '../app/resources/js/angular-route.min',
        jQuery: 'jquery/dist/jquery.min',
        chartJS: 'chartJS/Chart.min'
    },

    shim: {
        'ngRoute': {
          deps: ['angular']
        },
        'appModule': {
            deps: ['angular', 'ngRoute']
        }
    }
});

require(['appModule'], function() {
    angular.bootstrap(document, ['app']);
});


