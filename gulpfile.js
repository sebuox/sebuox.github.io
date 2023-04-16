var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('styles', function() {        
    gulp.src('wp-content/themes/themename/assets/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('wp-content/themes/themename/assets/css/'));    
});

gulp.task('scripts', function() {
  return gulp.src([
  		'!wp-content/themes/themename/assets/js/all.js',
  		'!wp-content/themes/themename/assets/js/all-min.js',
  		'wp-content/themes/themename/assets/js/*.js'])
    .pipe(concat({ path: 'all.js'}))
    .pipe(minify({
        ext:{
            src:'.js',
            min:'-min.js'
        },
    }))
    .pipe(gulp.dest('wp-content/themes/themename/assets/js/'));
});


gulp.task('watch',function() {
    gulp.watch('wp-content/themes/themename/assets/sass/*.scss',['styles']);
    gulp.watch('wp-content/themes/themename/assets/js/*.js',['scripts']);
});
exports.default = series(scssTask, jsTask, browserSysnServe, watchTask);

exports.build ) = series(scssTask, jsTask);
