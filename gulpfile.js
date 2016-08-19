// get the dependencies
var childProcess = require('child_process');
var electron     = require('electron-prebuilt');
var gulp         = require('gulp');

gulp.task('run', function () {
    childProcess.spawn(electron, ['.'],
    { stdio: 'inherit' });
});

gulp.task('debug', function () {
    childProcess.spawn(electron, ['--debug=5858', '.'],
    { stdio: 'inherit' });
});
