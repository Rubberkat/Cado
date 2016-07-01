var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');

gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/html/pages/**/*.+(html|nunjucks)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/html/templates']

        }))
        // output files in app folder
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
   gulp.watch('src/**/*.+(html|nunjucks)', ['nunjucks']);
   gulp.watch('src/scss/**/*.scss', ['sass']);
});

module.exports = function (app, nunjucks, dir) {

    app.set('views', dir.views);
    app.set('view engine', 'nunj');
    app.set('view cache', app.get('env') === 'production');
    nunjucks.configure('views', {
        autoescape: true,
        express: app
    });

    app.use(function (req, res, next) {
        res.locals.user = req.session.user || false;
        next();
    });

};