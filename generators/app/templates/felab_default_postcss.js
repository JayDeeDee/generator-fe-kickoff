module.exports = function (grunt, options) {

    const browserConfig = grunt.config.get('css.autoprefixer');

    return {

        dev: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: browserConfig}) // add vendor prefixes
                ]
            },
            src: '<%=config.css.devDir%>/*.css'
        },
        deploy: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({browsers: browserConfig}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            src: '<%=config.css.devDir%>/*.css'
        }
    }
};
