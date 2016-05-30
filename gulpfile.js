var gulp = require("gulp");
var replace = require("gulp-replace");
var runSequence = require("run-sequence");
var exec = require('child_process').exec;
var util = require('util');
var change = require('gulp-change');
var beautify = require('js-beautify').js_beautify;

gulp.task("1_2", function(callback) {
  exec("cd 1.2 && typings bundle --ambient -o out",
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback();
    });
});

function performChange(content) {
  var newContent = content
    .replace(/declare\s/g, "");

  return beautify(
    util.format("%s\ndeclare module \"meteor/%s\" {\n%s}",
    content, this.fname.replace(".d.ts", ""), newContent), {
    indent_size: 2,
    indent_char: " "
  }).replace(/declare\n/g, 'declare ');
}

gulp.task("prep_1_3", function() {
  return gulp.src(["./1.2/packages/*.ts"])
    .pipe(change(performChange))
    .pipe(gulp.dest("1.3/packages"));
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
