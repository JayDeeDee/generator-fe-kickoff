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
  fontdist: {
    files: [{
      expand: true,
      cwd: '<%=config.font.srcDir%>',
      src: ['**/*'],
      dest: '<%=config.font.distDir%>'
    }]
  }


};
