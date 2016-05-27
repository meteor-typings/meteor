var gulp = require("gulp");
var replace = require("gulp-replace");
var runSequence = require("run-sequence");
var exec = require('child_process').exec;

gulp.task("1_2", function(callback) {
  exec("cd 1.2 && typings bundle --ambient -o out",
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback();
    });
});

gulp.task("prep_1_3", function() {
  return gulp.src(["./1.2/packages/*.ts"])
    .pipe(replace(/declare/g, 'export'))
    .pipe(gulp.dest("1.3"));
});

gulp.task("1_3", function(callback) {
  exec("cd 1.3 && typings bundle -o out",
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback();
    });
});

gulp.task("build", function(callback) {
  runSequence("1_2", "prep_1_3", "1_3", callback);
});
