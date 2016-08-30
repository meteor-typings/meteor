var gulp = require("gulp");
var replace = require("gulp-replace");
var runSequence = require("run-sequence");
var exec = require('child_process').exec;
var util = require('util');
var change = require('gulp-change');
var beautify = require('js-beautify').js_beautify;
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var ignore = require('gulp-ignore');

gulp.task("prep_1_2_main", function() {
  return gulp.src(["./1.2/packages/*.d.ts"])
    .pipe(concat('main.d.ts'))
    .pipe(gulp.dest("1.2/"));
});

gulp.task("prep_1_2_browser", function() {
  return gulp.src(["./1.2/packages/*.d.ts"])
    .pipe(ignore('*tools_main.d.ts'))
    .pipe(concat('browser.d.ts'))
    .pipe(gulp.dest("1.2/"));
});

gulp.task("1_2_bundle", function(callback) {
  exec("cd 1.2 && typings bundle --global -o out/main.d.ts",
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback();
    });
});

gulp.task("1_2", function(callback) {
  runSequence("prep_1_2_main", "prep_1_2_browser", "1_2_bundle", callback);
});

function performChange(content) {
  var cleanContent = content
    .replace(/\/\/\/\s\<reference path=".*"\s\/>\n?/g, "")
    .replace(/^\n*\s*$/, '');

  var newModuleContent = cleanContent
    .replace(/declare\s/g, "");

  var fname = this.fname
    .replace(".d.ts", "")
    .replace("_main", "")
    .replace("_browser", "");

  return beautify(
    util.format(
      "%s\ndeclare module \"meteor/%s\" {%s}",
      cleanContent, fname, newModuleContent), {
    indent_size: 2,
    indent_char: " "
  })
  .replace(/declare\r?\n/g, "declare ")
  // removing space before/after ? for optional params
  .replace(/\s\?\s?/g, '?') + '\n';
}

gulp.task("prep_1_3_main", function() {
  return gulp.src(["./1.2/packages/*.ts", "./1.3/packages/*.ts"])
    .pipe(change(performChange))
    .pipe(concat('main.d.ts'))
    .pipe(gulp.dest("1.3/"));
});

gulp.task("prep_1_3_browser", function() {
  return gulp.src(["./1.2/packages/*.ts", "./1.3/packages/*.ts"])
    .pipe(ignore('*tools_main.d.ts'))
    .pipe(change(performChange))
    .pipe(concat('browser.d.ts'))
    .pipe(gulp.dest("1.3/"));
});

gulp.task("1_3_bundle", function(callback) {
  exec("cd 1.3 && typings bundle --global -o out/main.d.ts",
    function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      callback();
    });
});

gulp.task("1_3", function(callback) {
  runSequence("prep_1_3_main", "prep_1_3_browser", "1_3_bundle", callback);
});

gulp.task("build", function(callback) {
  runSequence("1_2", "1_3", callback);
});
