/**
 * grunt task (multi task) configuration for file and folder deletion
 * @module default/clean
 */

module.exports = function (grunt, options) {

    return {
        /* target for deleting fonts in dist folder */
        font: {
            src: ['<%=config.font.distDir%>/**/*']
        },
        /* target for deleting images in dist folder */
        img: {
            src: ['<%=config.img.distDir%>/**/*', '<%=config.distDir%>/**/*.ico']
        },
        /* target for deleting css in dist folder */
        css: {
            src: ['<%=config.css.distDir%>/**/*']
        },
        /* target for deleting scripts in dist folder */
        js: {
            src: ['<%=config.js.distDir%>/**/*']
        },
        /* target for deleting markup in dist folder */
        markup: {
            src: ['<%=config.markup.distDir%>/**/*.html']
        },
        /* target for deleting all development fragments */
        dev: {
            src: ['<%=config.devDir%>/**/*']
        }
    }

};
