'use strict';

const gulp = require('gulp'),
    minify = require('gulp-minify'),
    modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
    return gulp.src('./js/*js')
        .pipe(modernizr({
            "minify": true,
            "uglify" : true,
            "options": [
                "domPrefixes",
                "prefixes",
                "html5shiv",
                "setClasses",
                "addTest",
                "testProp"
            ],
            "feature-detects": [
                "test/img/webp-alpha",
                "test/img/webp-lossless"
            ]
        }))
        .pipe(minify())
        .pipe(gulp.dest('js/vendor/'))
});

gulp.task('build', gulp.series('modernizr'));
gulp.task('default', gulp.series('modernizr'));