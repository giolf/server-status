require.config({
    baseUrl: '../bower_components',

    paths: {
        app: '../app/js/app',
        angular: 'angular/angular.min',
        ngRoute: '../app/js/angular-route.min',
        jQuery: 'jquery/dist/jquery.min'
    },

    shim: {
        'ngRoute': {
          deps: ['angular']
        },
        'app': {
            deps: ['angular', 'ngRoute']
        }
    }
});

require(['app'], function() {
    angular.bootstrap(document, ['app']);
});


