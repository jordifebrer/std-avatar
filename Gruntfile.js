module.exports = function(grunt) {

    grunt.initConfig({
        'connect': {
            demo: {
                options: {
                    open: true,
                    keepalive: true
                }
            }
        },
        'gh-pages': {
            options: {
                clone: 'bower_components/std-avatar'
            },
            src: [
                'bower_components/**/*',
                '!bower_components/std-avatar/**/*',
                'demo/*', 'src/*', 'index.html'
            ]
        },
        'replace': {
            example: {
                src: ['src/*'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        },
        'bump': {
            options: {
                files: ['bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('release',['bump']);

};
