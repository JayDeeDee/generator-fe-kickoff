module.exports = function (grunt) {
    'use strict';

    // record duration of task execution
    require('time-grunt')(grunt);

    let path = require('path'),
        options = {
            // info stored in package.json <%=pkg.name%>
            pkg: require('./package'),
            // use & config jit-grunt as plug-in loader
            jitGrunt: {
                // map name of tasks to modules / scripts
                staticMappings: {
                    server: 'felab/custom/server.js',
                    testconfig: 'felab/custom/testconfig.js'
                }
            },
            // folder with default task configurations
            configPath: path.join(process.cwd(), 'felab/default'),
            // folder with developer specific overwrites
            overridePath: path.join(process.cwd(), 'felab/user'),
            // grunt config
            config : require('./felab/default/config.json')
        },
        // load tasks configuration
        configs = require('load-grunt-config')(grunt, options);
};
