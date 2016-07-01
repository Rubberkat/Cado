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

