let gulp = require('gulp');
let tpl = require('panini');
// load grunt config
let config = require('../default/config.json');

gulp.task('template', function(cb) {
    let destPath,
        option = process.argv.indexOf('--option');

    destPath = (option > -1) ? process.argv[option+1] : config.markup.devDir;
    gulp.src(config.markup.generator.root+'**/*.html')
        .pipe(tpl(config.markup.generator))
        .pipe(gulp.dest(destPath));
    cb();
});

