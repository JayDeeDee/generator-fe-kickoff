module.exports = {

    options: {
        /* string defined to put between each file in the concatenated output */
        separator: '; '
    },
    head: {
        src: ['<%=config.js.srcDir%>/head.js'],
        dest: '<%=config.js.devDir%>/<%=config.js.distHeadFileName%>'
    },
    body: {
        src: [
            '<%=config.js.srcDir%>/body.js'
        ],
        dest: '<%=config.js.devDir%>/<%=config.js.distBodyFileName%>'
    },
    headdist: {
      src: ['<%=config.js.srcDir%>/head.js'],
      dest: '<%=config.js.distDir%>/<%=config.js.distHeadFileName%>'
    },
    bodydist: {
      src: [
        '<%=config.js.srcDir%>/body.js'
      ],
      dest: '<%=config.js.distDir%>/<%=config.js.distBodyFileName%>'
    }


};
