'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true
            },
            less: {
                files: ['app/styles/*.less'],
                tasks: ['less:server']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/*.html',
                    'app/styles/{,*/}*.css',
                    'app/scripts/{,*/}*.js',
                    'app/components/{,*/}*.js',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'app'),
                            lrSnippet
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        copy: {
          ace: {
            files: [
              {
                expand: true,
                flatten: true,
                src: [
                  'bower_components/ace-builds/src/ace.js',
                  'bower_components/ace-builds/src/mode-javascript.js',
                  'bower_components/ace-builds/src/theme-ambiance.js',

                ],
                dest: 'app/scripts/vendor/ace/'
              }
            ]
          },
          angular: {
            files: [
              {
                expand: true,
                flatten: true,
                src: [
                  'bower_components/angular/angular.js'
                ],
                dest: 'app/scripts/vendor/angular/'
              }
            ]
          },
          bootstrap: {
            files: [
              {
                expand: true,
                flatten: true,
                src: [
                  'bower_components/bootstrap/dist/js/bootstrap.js'
                ],
                dest: 'app/scripts/vendor/bootstrap/'
              }
            ]
          },
          jquery: {
            files: [
              {
                expand: true,
                flatten: true,
                src: [
                  'bower_components/jquery/dist/jquery.js'
                ],
                dest: 'app/scripts/vendor/jquery/'
              }
            ]
          },
          bpmnio: {
            files: [
              {
                expand: true,
                flatten: true,
                src: [
                  'lib/bpmn-io/*.js'
                ],
                dest: 'app/scripts/vendor/bpmn-io/'
              }
            ]
          }
        },
        less: {
            server: {
                options: {
                    paths: ['app/components/bootstrap/less', 'app/styles']
                },
                files: {
                    'app/styles/main.css': 'app/styles/main.less'
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {

        grunt.task.run([
            'copy',
            'less:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });
};
