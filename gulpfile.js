var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	svgSprite = require('gulp-svg-sprites'),
	concat = require('gulp-concat'),
	uncss = require('gulp-uncss'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	rigger = require('gulp-rigger'),
	merge = require('merge-stream'),
	buffer = require('vinyl-buffer');

// browser 
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
});

// sass
gulp.task('sass', function () {
	return gulp.src('app/css/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
		cascade: false
	}))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(browserSync.reload({stream: true}));
});

// min css
// gulp.task('css:min', function () {
// 	return gulp.src('dist/assets/main.css')
// 	pipe(uncss({
// 		html: ['dist/*.html']
// 	}))
// 	.pipe(cssmin())
// 	.pipe(rename({suffix: '.min'}))
// 	.pipe(gulp.dest('dist/assets/css'))
// 	.pipe(browserSync.reload({stream: true}));
// });

// libs js
gulp.task('js:libs', function () {
	gulp.src([
		'bower_components/jquery/dist/jquery.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js/'));
});

// main js
gulp.task('js:main', function () {
	gulp.src('app/js/*.js')
	.pipe(gulp.dest('dist/assets/js/'))
	.pipe(browserSync.reload({stream:true}));
});

// SVG Task
gulp.task('sprite', function () {
	return gulp.src('app/img/icons/**/*.svg')
	.pipe(svgSprite({
		cssFile: "../../app/css/_sprite.scss",
		preview: false,
		templates: { scss: true },
		svg: { sprite: "img/sprite.svg" }
	}))
	.pipe(gulp.dest('dist/assets'));
});

// html builder
gulp.task('html:build', function () {
	gulp.src('app/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['html:build', 'js:libs', 'js:main', 'sprite', 'browser-sync','sass', /*'css:min'*/], function () {
	gulp.watch('app/css/*.scss', ['sass'/*, 'css:min'*/]);
	gulp.watch('app/**/*.html', ['html:build']);
	gulp.watch('app/img/icons/*.svg', ['sprite', 'sass']);
	gulp.watch('app/js/*.js', ['js:main']);
});