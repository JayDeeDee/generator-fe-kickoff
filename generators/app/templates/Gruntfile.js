module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);                                           // record duration of task execution

    let path = require('path'),
        options = {
            pkg: require('./package'),                                      // info stored in package.json <%=pkg.name%>
            jitGrunt: {                                                     // use & config jit-grunt as plug-in loader
                staticMappings: {                                           // map name of tasks to modules / scripts
                    styles: 'felab/custom/server.js',
                    testconfig: 'felab/custom/testconfig.js'
                }
            },
            configPath: path.join(process.cwd(), 'felab/default'),          // folder with default task configurations
            overridePath: path.join(process.cwd(), 'felab/user'),           // folder with developer specific overwrites
            config : require('./felab/default/config.json')                 // grunt config
        },
        configs = require('load-grunt-config')(grunt, options);             // load tasks configuration
};
