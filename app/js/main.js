require.config({
    baseUrl: '../app',

    paths: {
        appModule: 'js/app',
        cpuChartModule: 'controllers/cpu-controller',
        ramChartModule: 'controllers/ram-controller',
        hdChartModule: 'controllers/hd-controller',
        serverStatusModule: 'js/server-status',
        serverRequestsModule: 'services/server-requests',
        angular: '../bower_components/angular/angular.min',
        ngRoute: '../app/resources/js/angular-route.min',
        jQuery: 'jquery/dist/jquery.min',
        chartJS: '../bower_components/chartJS/Chart.min'
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


