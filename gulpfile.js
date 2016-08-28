var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserSync = require('browser-sync').create();
var del = require('del');

gulp.task("default", ["copyFiles"], function () {
	return gulp.src("src/js/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat("app.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("dist/src/js"));
});

gulp.copy = function (src,dest) {
	return gulp.src(src, {base:"."})
		.pipe(gulp.dest(dest));
};

gulp.task("copyFiles", function () {
	return gulp.copy(["src/**/*", "!src/js/*.js"], "dist");
});

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'src'
		},
	});
});

gulp.task('watch', ['browserSync'], function () {
	gulp.watch('src/**/*.*', browserSync.reload);
});

gulp.task('clean', function () {
	return del.sync('dist');
});
