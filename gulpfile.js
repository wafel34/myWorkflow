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
});



/*---------------------------
        WATCH TASK
---------------------------*/

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
})



/*---------------------------
        DEFAULT TASK
---------------------------*/