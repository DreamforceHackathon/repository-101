module.exports = function (grunt) {

    var js_files = [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/ratchet/js/ratchet.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-bootstrap/ui-bootstrap.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './src/callforce/callforce.js',
        './src/**/*.js'
    ];

    var css_files = [
        './bower_components/ratchet/css/ratchet.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './src/callforce/callforce.css'
    ];

    //Initializing the configuration object
    grunt.initConfig({

        // Task configuration
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: js_files,
                dest: './dist/scripts.js'
            }
        },
        concat_css: {
            all: {
                src: css_files,
                dest: './dist/styles.css'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            frontend: {
                files: {
                    './dist/scripts.js': './dist/scripts.js'
                }
            }
        },
        watch: {
            js: {
                files: js_files,
                tasks: ['concat:js'] //tasks to run
            },
            css: {
                files: css_files,  //watched files
                tasks: ['concat_css:all']  //tasks to run
            }
        },
        copy: {
            ratchet: {
                src: './bower_components/ratchet/fonts/*',
                flatten: true,
                expand: true,
                dest: './fonts'
            },
            font_awesome: {
                src: './bower_components/font-awesome/fonts/*',
                flatten: true,
                expand: true,
                dest: './fonts'
            }
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concat-css');

    // Task definition
    grunt.registerTask('default', ['watch']);

};
