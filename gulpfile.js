var gulp = require('gulp');
var run = require('gulp-run')
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');

// JS Watch and reload
gulp.task('js', function() {
    return gulp.src('app/js/*.js')
        // reload when js file is edited
        .pipe(livereload())
});
// JS Watch and reload

// pug Preprocessor
gulp.task('pug', function(){
   return gulp.src('app/*.pug')
      // Specifies which file is will be processed into html
      .pipe(pug({pretty: true}))
      // Compiles the pug file into HTML
      .pipe(gulp.dest('app'))
      // Specifies where the processed HTML file will reside
      .pipe(livereload())
});
// pug Preprocessor

// Sass Preprocessor
gulp.task('sass', function() {
   return gulp.src( 'app/css/*.sass')
      .pipe(sass())
      // converts sass to css
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
      // adds compatibilirt for multiple browsers
      .pipe(gulp.dest('app/css'))
      // outputs css file to the applications destination
      .pipe(livereload())
});
// Sass Preprocessor

// All tasks to be watched
gulp.task('watch', ['serve'], function() {
    // Gulp will watch for any events being listened to
    livereload.listen();
    // Watch for any changes being made to JS function and execute code inside
    gulp.watch('app/js/*.js', ['js']);
    // Watch for any changes being made to SASS function and execute code inside
    gulp.watch('app/css/*.sass', ['sass']);
    // Watch for any changes being made to PUG function and execute code inside
    gulp.watch('app/*.pug', ['pug']);
});
// All tasks to be watched

// Electron application
gulp.task('serve', ['pug', 'js', 'sass'], function() {
    // Command for running Electron
    run('electron app/main.js').exec();
});
// Electron application

// Run Gulpfile.js
gulp.task('default', ['watch', 'serve']);
// Run Gulpfile.js
