/**
 * grunt task (multi task) configuration for sass compilation
 * @module default/sass
 */

module.exports = {

    dev: {
        options: {
            outputStyle: 'nested',
            sourceMap: true
        },
        files: {
            '<%=config.css.compileFiles[0].dev%>': '<%=config.css.compileFiles[0].src%>'
        }
    },
    deploy: {
        options: {
            outputStyle: 'compressed',
            sourceMap: false
        },
        files: {
            '<%=config.css.compileFiles[0].dist%>': '<%=config.css.compileFiles[0].src%>'
        }
    }
};
