/*---------------------------
        MODULES
---------------------------*/

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify   = require('gulp-browserify'),
    minifyCss    = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    gulpIf       = require('gulp-if'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch'),
    htmlmin      = require('gulp-htmlmin'),
    sourcemaps   = require('gulp-sourcemaps'),
    imagemin     = require('gulp-imagemin'),
    //pngquant     = require('pngquant'),
    browserSync  = require('browser-sync').create();

/*---------------------------
        TASKS
---------------------------*/

var sassSources,
    jsSources,
    cssDest,
    outputDir;


jsSources    = 'components/scripts/**/*.js';
sassSources  = 'components/sass/**/*.sass';


var handleError = function (err) {
    console.log(err);
    this.emit('end');
};

//BROWSER-SYNC RELOAD
gulp.task('serv', function () {
   browserSync.init({
       server: "./builds/development"
   })
});

//SASS TO CSS
gulp.task('sass', function () {
    return gulp.src(sassSources)
            .pipe(plumber({
                errorHandler: undefined
            }))
            .pipe(sass())
            .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('builds/development/css'))
            .pipe(browserSync.stream())
});

//CONCAT JS

gulp.task('js', function () {
   return gulp.src(jsSources)
            .pipe(plumber({
                errorHandler: undefined
            }))
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(browserify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('builds/development/js'))
            .pipe(browserSync.stream())
});



/*---------------------------
        WATCH TASK
---------------------------*/

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch('builds/development/*.html').on('change', browserSync.reload);
})



/*---------------------------
        DEFAULT TASK
---------------------------*/

gulp.task('default', ['serv', 'sass', 'js', 'watch'])