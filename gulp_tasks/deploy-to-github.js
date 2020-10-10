'use strict';

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

function deploy() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
}

module.exports = deploy;
