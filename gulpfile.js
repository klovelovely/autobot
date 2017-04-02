const gulp = require('gulp');  //加载gulp

/**
 * uglify
 */
const uglify = require('gulp-uglify');
gulp.task('uglify', function () {
    gulp.src(['src/js/*.js','!src/js/*.min.js'])  //获取文件，同时过滤掉.min.js文件
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));  //输出文件
});

/**
 * cssmini
 */
const minify = require('gulp-minify-css');
gulp.task('cssmini', function () {
    gulp.src(['src/css/*.css', '!src/css/*.min.css'])  //要压缩的css
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
});

/**
 * htmlmini
 */
const htmlmini = require('gulp-minify-html');
gulp.task('htmlmini', function () {
    gulp.src('src/*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('dist'));
})

/**
 * jshint
 */
const jshint = require("gulp-jshint");
gulp.task('jsLint', function () {
    gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});

/**
 * concat
 */
const concat = require("gulp-concat");
gulp.task('concat', function () {
    gulp.src('src/js/*.js')  //要合并的文件
    .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

/**
 * less
 */
const less = require("gulp-less");
gulp.task('compile-less', function () {
    gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});

/**
 * sass
 */
const sass = require("gulp-sass");
gulp.task('compile-sass', function () {
    gulp.src('src/sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

/**
 * imagemin
 */
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant'); //png图片压缩插件
const imageminJpegRecompress = require('imagemin-jpeg-recompress');  
gulp.task('imagemin', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant(), imageminJpegRecompress()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist/images'));
});

/**
 * livereload
 */
const livereload = require('gulp-livereload');
gulp.task('watch', function() {
  livereload.listen(); //要在这里调用listen()方法
  gulp.watch('html/*.html', ['htmlmini']);  //监听目录下的文件，若文件发生变化，则调用html任务。
  gulp.watch('less/*.less', ['less']);  //监听目录下的文件，若文件发生变化，则调用less任务。
  gulp.watch('scss/*.scss', ['scss']);  //监听目录下的文件，若文件发生变化，则调用scss任务。
});

/**
 * browser-sync
 */
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('browser-sync-proxy', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});


gulp.task('default', function(){
    gulp.run(['concat'], ['cssmini'], ['htmlmini'])
})