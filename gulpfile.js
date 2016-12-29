'use strict';

var gulp = require('gulp'),
    maps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
  rename = require('gulp-rename'),
   image = require('gulp-image'),
     del = require('del'),
  server = require('gulp-webserver'),
    lint = require('gulp-eslint');

// run lint task first,
// then concatenate all js and minify -> all.min.js
// with source map
// -> copy -> dist/scripts
gulp.task('scripts', ['lint'], function() {
  return gulp.src(['js/circle/*.js', 'js/global.js'])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('dist/scripts'));
});

// lint all project js files
// output errors to console and fail if error
gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
    .pipe(lint({ configFile: 'eslint.json' }))
    .pipe(lint.format())
    .pipe(lint.failAfterError());
});

// compile scss files -> css
// concatenate all and minify -> all.min.css
// with source map
// -> copy -> dist/styles
gulp.task('styles', function() {
  return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('dist/styles'));
});

// reduce size of image files
// -> copy -> dist/content
gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(image())
    .pipe(gulp.dest('dist/content'))
});

// delete everything in dist directory
gulp.task('clean', function() {
  del(['dist', 'js/all*.js*', 'css']);
});

// run build task and serve project using a local web server
gulp.task('serve', ['build'], function() {
  gulp.src('')
    .pipe(server({ port: 3000, livereload: true }));
});

// if change is made to js file, rerun scripts task
// if change is made to sass file, rerun styles task
gulp.task('watch', ['serve'], function() {
  gulp.watch(['js/circle/*.js', 'js/global.js'], ['scripts']);
  gulp.watch('sass/*.scss', ['styles']);
});

// run clean task first, then run scripts, styles, & images tasks
gulp.task('build', ['clean'], function() {
  gulp.start(['scripts', 'styles', 'images']);
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

// run build task
gulp.task('default', ['build']);
