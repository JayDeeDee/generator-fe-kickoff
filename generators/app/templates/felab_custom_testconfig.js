module.exports = function(grunt){
    "use strict";

    grunt.registerTask('testconfig', 'Log stuff.', function() {
        console.log(grunt.config.get('css'));
        console.log('<%=config.css.compileFiles[0].dev%>');
    });

};
