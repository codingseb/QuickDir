// get the dependencies
var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var jsmin = require('gulp-jsmin');
var jsonTransform = require('gulp-json-transform');

gulp.task('run', function () {
    childProcess.spawn(electron, ['.'],
    { stdio: 'inherit' });
});

gulp.task('debug', function () {
    childProcess.spawn(electron, ['--debug=5858', '.'],
    { stdio: 'inherit' });
});

gulp.task('cssmin', function () {
    gulp.src('src/ui/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/ui'));
});

gulp.task('htmlmin', function () {
    gulp.src('src/ui/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/ui'));
});

gulp.task('jsmin', function () {
    gulp.src('src/ui/**/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/ui'));
});

gulp.task('fonts', function(){
    gulp.src('src/ui/fonts/*.*')
        .pipe(gulp.dest('dist/ui/fonts'));
});

gulp.task('build-electron', function(){
    gulp.src('src/electron/**/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/electron'));
});

gulp.task('package_json', function(){
    gulp.src('package.json')
        .pipe(jsonTransform(function(data, file){
            return {
                name: data.name,
                version: data.version,
                description: data.description,
                main: "electron/electron-app.js"
            };
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default',
    [
        'cssmin',
        'htmlmin',
        'jsmin',
        'fonts',
        'build-electron'
    ]);

