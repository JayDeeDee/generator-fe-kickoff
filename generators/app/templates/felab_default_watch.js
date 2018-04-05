module.exports = {

    options: {
        spawn: false
    },
    css: {
        files: [
            '<%=config.css.srcDir%>/**/*.scss'
        ],
        tasks: [
            'sass:dev', 'postcss:dev', 'bs-inject'
        ]
    },
    js: {
        files: [
            '<%=config.js.srcDir%>/**/*.js'
        ],
        tasks: [
            'concat:head', 'concat:body', 'bs-inject'
        ]
    },
    tpl: {
        files: [
            '<%=config.distDir%>/*.html'
        ],tasks: [
            'bs-inject'
        ]
    },
    img: {
        files: [
            '<%=config.img.srcDir%>/**/*.jpg',
            '<%=config.img.srcDir%>/**/*.ico',
            '<%=config.img.srcDir%>/**/*.gif',
            '<%=config.img.srcDir%>/**/*.png',
            '<%=config.img.srcDir%>/**/*.svg'
        ],
        tasks: 'copy:img'
    }
};
