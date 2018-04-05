module.exports = {

    default: {
        src: '<%=config.css.srcDir%>/**/*.scss',
        options: {
            dest: './doc/sassdoc',
            display: {
                access: ['public', 'private'],
                alias: true,
                watermark: true
            },
            groups: {
                slug: 'Title',
                helpers: 'Helpers',
                hacks: 'Hacks & Fixes', 'undefined': 'Ungrouped'
            },
            basePath: '../../src/scss'
        }
    }

};
