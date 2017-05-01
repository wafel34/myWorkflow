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
    browserSync  = require('browser-sync').create();

/*---------------------------
        TASKS
---------------------------*/

var sassSources,
    jsSources,
    cssDest,
    outputDir;


jsSources    = 'components/scripts/*.js';
sassSources  = 'components/sass/*.sass';


//SASS TO CSS
gulp.task('sass', function () {
    return gulp.src(sassSources)
            .pipe(plumber())
            .pipe(sass())
            .pipe(gulp.dest('builds/development/css'))
});

//CONCAT JS

gulp.task('js', function () {
   return gulp.src(jsSources)
            .pipe(plumber())
            .pipe(concat('main.js'))
            .pipe(browserify())
            .pipe(gulp.dest('builds/development/js'))
});



/*---------------------------
        WATCH TASK
---------------------------*/





/*---------------------------
        DEFAULT TASK
---------------------------*/