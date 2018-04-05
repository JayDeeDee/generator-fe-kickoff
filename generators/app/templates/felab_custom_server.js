/**
 * grunt tasks definition for local development server
 * @module custom/server
 */

module.exports = function (grunt) {
    "use strict";

    let browserSync = require("browser-sync").create(),
        bsFiles = grunt.config.get('dev.files'),

        connect = require('connect'),
        serveStatic = require('serve-static');

    /**
     * function task for local development server without sync function
     */
    grunt.registerTask('connect-init', function () {
        const dirs = grunt.config.get('dev.baseConnectDir'),
            port = grunt.config.get('dev.portDev'),
            app = connect();

        dirs.forEach(function (dir) {
            app.use(serveStatic(dir));
        });

        app.listen(port);
        console.log('-------------------------------------');
        console.log('Local: http://localhost:' + port);
        console.log('-------------------------------------');

    });

    /**
     * function task for test server
     */
    grunt.registerTask('connect-test', function () {
        const dirs = grunt.config.get('dev.testConnectDir'),
            port = grunt.config.get('dev.portDev'),
            app = connect();

        dirs.forEach(function (dir) {
            app.use(serveStatic(dir));
        });

        app.listen(port);
        console.log('-------------------------------------');
        console.log('Local: http://localhost:' + port);
        console.log('-------------------------------------');

    });

    /**
     * function task for manually initializing browser sync
     */
    grunt.registerTask("bs-init", function () {
        let done = this.async();
        browserSync.init({
            open: "local",
            browser: grunt.config.get('dev.browser'),
            logLevel: grunt.config.get('dev.logLevel'),
            timestamps: false,
            ui: {
                port: grunt.config.get('dev.portSync')
            },
            port: grunt.config.get('dev.portUi'),
            server: grunt.config.get('dev.baseDir')
        }, function (err, browserSync) {

            if (err) {
                console.error(err);
            }
            done();
        });
    });

    /**
     * task for code injection
     */
    grunt.registerTask('bs-inject', function () {
        console.log('bs-inject -------------------------------------');
        browserSync.reload(bsFiles);
    });

    /**
     * task for stopping browser sync
     */
    grunt.registerTask("bs-stop", function () {
        browserSync.exit();
    });

    /**
     * function task that runs on of the server tasks
     */
    grunt.registerTask('server', "Local Development Server", function (target) {

        console.log('server -------------------------------------');
        const tasks = {
            sync: ['bs-init', 'watch'], // watch all src files for code changes
            test: ['connect-test', 'watch:test'], // watch test src files for code changes
            auto: ['connect-init', 'watch'], // watch all src files for code changes
            default: ['bs-init', 'watch'] // default: watch all src files for code changes
        };

        grunt.task.run(tasks[target] || tasks['default'])
    });
};
