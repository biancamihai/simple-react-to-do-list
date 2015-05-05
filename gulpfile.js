/*var gulp = require('gulp')
var react = require('gulp-react')

// transform jsx to js
gulp.task('transpile-js', function() {
  return gulp.src('./src/*.jsx')
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('./build'))
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/*.jsx', ['transpile-js']);
});

// Default Task
gulp.task('default', ['transpile-js', 'watch']);*/

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var sixtofiveify = require('6to5ify');
var reactify     = require('reactify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var browserSync  = require('browser-sync');
//var uglify = require('gulp-uglify');

// Input file.
var bundler     = watchify(browserify('./src/app.jsx', watchify.args));

// React JSX transform
bundler.transform(reactify);

// Babel, 6to5ify transform
bundler.transform(sixtofiveify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {
	return bundler.bundle()
    .on('error', function (err) {
    	// on error log error
        gutil.log(err.message);
        browserSync.notify("Browserify Error!");
        this.emit("end");
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true, once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
  return bundle();
});

/**
 * First bundle, then serve from the current directory
 */
gulp.task('default', ['bundle'], function () {
  browserSync({
      server: "."
  });
});
