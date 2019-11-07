module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            options: {
                sourceMap: true,
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'pub/css/styles.css': [
                        'assets/dist/css/responsive-styles-processed.css'
                    ]
                }
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        overrideBrowserslist: ['last 2 versions',  'ie 11']
                    })
                ]
            },
            dist: {
                src: 'assets/dist/css/responsive-styles.css',
                dest: 'assets/dist/css/responsive-styles-processed.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/dist/images/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'pub/img/'
                }]
            }
        },

        watch: {
            css: {
                files: ['assets/dist/css/responsive-styles.css'],
                tasks: ['postcss', 'cssmin'],
                options: {
                    livereload: true,
                },
            },
            imagemin: {
                files: 'assets/dist/images/**/*.{png,jpg,jpeg,gif}',
                tasks: ['imagemin']
            },
        }

    });


    // grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // grunt.registerTask('default', ['cssmin']);
    grunt.registerTask('default', ['postcss', 'cssmin', 'imagemin', 'watch']);
    // grunt.registerTask('dev', ['less:dev', 'postcss:dev', 'imagemin', 'watch']);
};
