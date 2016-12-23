var gulp = require('gulp'),
    maps = require('gulp-sourcemaps'), 
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
  rename = require('gulp-rename'),
     del = require('del');

// gulp scripts:
// concatenate, minify, copy all js -> all.min.js
// -> copy -> dist/scripts
// with source map
gulp.task('scripts');

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
    .pipe(gulp.dest('sass'))
    .pipe(gulp.dest('dist/styles'));
});

// gulp images:
// optimize size of jpeg & png files
// -> copy -> dist/content
gulp.task('images');

// delete everything in dist directory
gulp.task('clean', function() {
  del(['dist', 'sass/**.css*']);
});

// run clean task first, then run scripts, styles, & images tasks
gulp.task('build', ['clean'], function() {
  // scripts, styles, images
});

// run build task
gulp.task('default', function() {
  gulp.start('build');
});
