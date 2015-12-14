'use strict';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
  useref = require('gulp-useref'),
     iff = require('gulp-if'),
    csso = require('gulp-csso'),
    pages = require('gulp-gh-pages');

    var options = {
      public: './public/',
      dist: './dist/'
    }


    gulp.task('compileSass', function() {
      return gulp.src(options.public + 'scss/main.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(options.public + 'css/'));
    });

    gulp.task('html', ['compileSass'], function() {
      var assets = useref.assets();
      return gulp.src(options.public + 'index.html')
                  .pipe(assets)
                  .pipe(iff('*.js', uglify()))
                  .pipe(iff('*.css', csso()))
                  .pipe(assets.restore())
                  .pipe(useref())
                  .pipe(gulp.dest(options.dist));
    });

    gulp.task('watchFiles', function() {
      gulp.watch(options.public + 'scss/**/*.scss', ['compileSass']);
    });

    gulp.task('assets', function(){
      return gulp.src([options.public + 'img/**/*',
                       options.public + 'fonts/**/*',
                       options.public + 'font-awesome/**/*',
                       options.public + 'mail/**/*'], {base: options.public})
              .pipe(gulp.dest(options.dist));
    })

    // watch sass
    gulp.task('serve', ['compileSass', 'watchFiles']);

    gulp.task('clean', function() {
      del([options.dist]);
      // delete compiles css and map
      del([options.public + 'css/main.css*']);
    });

    gulp.task('build', ['html', 'assets'])
    gulp.task('deploy', function() {
      return gulp.src(options.dist + '**/*').pipe(pages());
    })
    gulp.task('default', ['clean'], function(){
      gulp.start('build');
});
