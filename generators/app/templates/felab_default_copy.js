module.exports = {

    img: {
        files: [{
            expand: true,
            cwd: '<%=config.img.srcDir%>',
            src: ['**/*'],
            dest: '<%=config.img.devDir%>'
        }]
    },
    font: {
        files: [{
            expand: true,
            cwd: '<%=config.font.srcDir%>',
            src: ['**/*'],
            dest: '<%=config.font.devDir%>'
        }]
    },
  imgdist: {
    files: [{
      expand: true,
      cwd: '<%=config.img.srcDir%>',
      src: ['**/*'],
      dest: '<%=config.img.distDir%>'
    }]
  },

  testtpl: {
    files: [{
      expand: true,
      cwd: '<%=config.markup.srcDir%>',
      src: ['**/*'],
      dest: '<%=config.markup.testDir%>'
    }]
  },
  html: {
    files: [{
      expand: true,
      cwd: '<%=config.markup.srcDir%>',
      src: ['*'],
      dest: '<%=config.markup.devDir%>'
    }]
  },
  htmldist: {
    files: [{
      expand: true,
      cwd: '<%=config.markup.srcDir%>',
      src: ['*.html'],
      dest: '<%=config.markup.distDir%>'
    }]
  },
  htmltest: {
    files: [{
      expand: true,
      cwd: '<%=config.markup.srcDir%>',
      src: ['*.html'],
      dest: '<%=config.markup.testDir%>'
    }]
  },
  fontdist: {
    files: [{
      expand: true,
      cwd: '<%=config.font.srcDir%>',
      src: ['**/*'],
      dest: '<%=config.font.distDir%>'
    }]
  }


};
