/**
* Create by duhuo@2dfire 2017/08/16
**/

var gulp = require('gulp');
var clean = require('gulp-clean');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var taskReplace = require('gulp-replace-task');
var stripDebug = require('gulp-strip-debug');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');

var PATH_ASSETS = './release/tmp';
var PATH_IMAGES = './images/**/*';
var PATH_JS = './js/**/*';
var PATH_CHECK_HEALTH = './check_health';
var PATH_PUBLIC = './public';

var PATH_TMP = './release/tmp';
var PATH_REV = './release/rev';
var PATH_MIN = './release/min';


var config = require('./config');

var path = require('path');

var env = process.env.NODE_ENV || 'dev';


var ASSETS_PATH = {
    html: './page/**/*.html',
    js: './js/**/*.js',
    css: './css/**/*.css',
    img: './img/**/*',
    images: './images/**/*',
    fonts: './fonts/**/*'
};


// 清理目录 release
gulp.task('clean', function () {
    return gulp.src(['./release'], { read: false })
        .pipe(clean());
});

// 清理目录 rev
gulp.task('clean-rev', ['min'], function () {
    return gulp.src(['./release/rev'], { read: false })
        .pipe(clean());
});

// 文件 reb hash
gulp.task('rev-hash', ['useref'], function () {
    var css = path.join(PATH_TMP, ASSETS_PATH.css);
    var js = path.join(PATH_TMP, ASSETS_PATH.js);
    var img = path.join(PATH_TMP, ASSETS_PATH.img);
    var files = [css, js, img];
    console.log('rev:', files);
    return gulp.src(files, { base: PATH_TMP })
        .pipe(rev())
        .pipe(gulp.dest(PATH_REV))
        .pipe(rev.manifest())
        .pipe(gulp.dest(PATH_REV))
});

// 文件 rev replace
gulp.task("rev-replace", ['rev-hash'], function () {
    var manifest = gulp.src(PATH_REV + "/rev-manifest.json");
    var html = path.join(PATH_TMP, ASSETS_PATH.html);
    var js = path.join(PATH_REV, ASSETS_PATH.js);
    var css = path.join(PATH_REV, ASSETS_PATH.css);

    var files = [html, js, css];
    return gulp.src(files, { base: PATH_TMP })
        .pipe(revReplace({ manifest: manifest }))
        .pipe(gulp.dest(PATH_REV));
});

// 文件 copy public js
gulp.task('copy-public', ['rev-replace'], function () {
    var css = path.join(PATH_PUBLIC, ASSETS_PATH.css);
    var js = path.join(PATH_PUBLIC, ASSETS_PATH.js);
    var files = [css, js];
    console.log('copy-public:', files)
    return gulp.src(files, { base: './' })
        .pipe(gulp.dest(PATH_TMP))
        .pipe(gulp.dest(PATH_MIN))
});

// 文件 copy assets img
gulp.task('copy-assets', ['rev-replace'], function () {
    var img = path.join(PATH_ASSETS, ASSETS_PATH.img);
    var files = [img];
    console.log('copy-assets:', files)
    return gulp.src(files, { base: PATH_ASSETS })
        .pipe(gulp.dest(PATH_TMP))
        .pipe(gulp.dest(PATH_MIN))
});

// 文件 copy images
gulp.task('copy-images', ['clean'], function () {
    var images = PATH_IMAGES;
    var files = [images];
    console.log('copy-images:', files);
    return gulp.src(files, { base: "./" })
        .pipe(gulp.dest(PATH_TMP))
});

// 文件 copy js
gulp.task('copy-js', function () {
    var jsPath = PATH_JS;
    var files = [jsPath];
    console.log('copy-js:', files);
    return gulp.src(files, { base: "./" })
        .pipe(gulp.dest(PATH_TMP))
});

// 文件 copy check_health
gulp.task('copy-check-health', function () {
    var check_health = PATH_CHECK_HEALTH;
    var files = [check_health];
    console.log('copy-check-health:', files);
    return gulp.src(files, { base: "./" })
        .pipe(gulp.dest(PATH_TMP))
        .pipe(gulp.dest(PATH_MIN))
});

// 文件 copy html 合并 请求
gulp.task('useref', ['clean'], function () {
    var replace_assets = replace('/assets/', '../');

    return gulp.src(ASSETS_PATH.html)
        .pipe(inject(gulp.src(['./node_modules/@2dfire/analytics-utils/*.html']), {
            starttag: '<!-- inject:{{path}} -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(useref())
        .pipe(gulpif('*.js', replace_assets))
        .pipe(gulpif('*.css', replace_assets))
        .pipe(gulp.dest(PATH_TMP + '/page'));
});

// 文件 min
gulp.task('min', function () {
    var css = path.join(PATH_ASSETS, ASSETS_PATH.css);
    var html = path.join(PATH_ASSETS, ASSETS_PATH.html);
    var js = path.join(PATH_ASSETS, ASSETS_PATH.js);
    var img = path.join(PATH_ASSETS, ASSETS_PATH.img);
    var image = path.join(PATH_ASSETS, ASSETS_PATH.images);
    var font = path.join(PATH_ASSETS, ASSETS_PATH.fonts);
    var files = [css, html, js, css, img, image, font];

    console.log('min:', files);
    var patterns = config.patterns[env] || [];
    console.log(env);

    return gulp.src(files, { base: PATH_ASSETS })
        // .pipe(gulpif('*.css'  , cssmin()))
        // .pipe(gulpif('*.js' , uglify()))  // uglify 在webpack 的时候做了。
        .pipe(gulpif('*.html', htmlmin({ collapseWhitespace: true })))

        .pipe(gulpif('*.js', taskReplace({ patterns: patterns })))
        .pipe(gulpif('*.css', taskReplace({ patterns: patterns })))
        .pipe(gulpif('*.html', taskReplace({ patterns: patterns })))

        .pipe(gulp.dest(PATH_MIN));
});

gulp.task('strip', ['min'], function () {
    var js = path.join(PATH_MIN, "/js/*.js");

    var isPublish = (env == "publish");
    return gulp.src(js, { base: PATH_MIN })
        .pipe(gulpif(isPublish, stripDebug()))
        .pipe(gulp.dest(PATH_MIN));
});


// 打包
// 拷贝 pub 目录
//
// 拷贝 html
// 拷贝 combo css js
//
// 文件 js eslint
// 文件 js ugliy
//
// 文件 css prefix
// 文件 css mini
//
// 文件 rev hash
// 文件 rev replace
//

gulp.task('build',
    [
        // 'clean',
        // 'copy-public',
        // 'copy-assets',
        // 'copy-images',
        // 'copy-js',
        'copy-check-health',
        // 'useref',
        // 'rev-hash',
        // 'rev-replace',
        'min',
        'strip'
        // 'clean-rev'
    ]);

// gulp.task('default', ['watch']);

