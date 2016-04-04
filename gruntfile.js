module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            dist: {
                options: {
                    waitSeconds: 0,
                    baseUrl: "./app/",
                    mainConfigFile: 'app/js/main.js',
                    name: 'js/main',
                    out: "build/app.js",
                    optimize: "none",
                    //inlineText: true,
                    findNestedDependencies: true,
                    paths: {
                        requireLib: "../bower_components/requirejs/require",
                        angular: "../bower_components/angular/angular.min",
                        chartJS: "../bower_components/chartJS/Chart.min"
                    },
                    include: [
                        "requireLib",
                        "angular",
                        "chartJS"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('build', ['requirejs']);
};
