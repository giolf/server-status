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
        uiRoute: '../bower_components/angular-ui-router/release/angular-ui-router.min',
        jQuery: 'jquery/dist/jquery.min',
        chartJS: '../bower_components/chartJS/Chart'
    },

    shim: {
        'uiRoute': {
          deps: ['angular']
        },
        'appModule': {
            deps: ['angular', 'uiRoute']
        }
    }
});

require(['appModule'], function() {
    angular.bootstrap(document, ['app']);
});


