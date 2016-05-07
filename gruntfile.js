module.exports = function (grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            dist: {
                options: {
                    waitSeconds: 0,
                    baseUrl: "./app/",
                    mainConfigFile: 'app/js/main.js',
                    name: 'js/main',
                    out: "app/resources/build/js/app.min.js",
                    optimize: "none",
                    //inlineText: true,
                    findNestedDependencies: true,
                    paths: {
                        requireLib: "../bower_components/requirejs/require"
                    },
                    include: [
                        "requireLib"
                    ]
                }
            }
        },
        watch: {
            js: {
                files: ['app/js/*.js', '!app/js/*.min.js'],
                tasks: ['requirejs']
            },
            controllers: {
                files: ['app/controllers/*.js', '!app/controllers/*.min.js'],
                tasks: ['requirejs']
            },
            resources: {
                files: ['app/resources/css/*.css', '!app/resources/css/*.min.css'],
                tasks: ['cssmin:combine']
            },
            services: {
                files: ['app/services/*.js', '!app/services/*.min.js'],
                tasks: ['requirejs']
            }
        },
        cssmin: {
            combine: {
                files: {
                    'app/resources/build/css/app.min.css': ['bower_components/bootstrap/dist/css/bootstrap.min.css', 'app/resources/css/style.css']
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['requirejs', 'cssmin:combine']);
};
