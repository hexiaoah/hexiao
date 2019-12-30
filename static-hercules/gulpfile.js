/**
 * Created by hupo on 16/10/8.
 */

/**
 TODO:
 1/ static目录下的文件添加hash
 2/ html添加防止缓存的hash
 3/ 不需要webpack处理的html自动拷贝到release/min/page
 4/ jsSdk 优化为node模块
 5/ 自动化添加新项目
 */

var gulp = require('gulp'),
    // imagemin = require('gulp-imagemin'), //图片压缩
    uglify = require('gulp-uglify'), //js 压缩
    stripDebug = require('gulp-strip-debug'), // 删除文件中的 log 和 debug
    runsequence = require('run-sequence'), //顺序执行器
    clean = require('gulp-clean'),
    replace = require('gulp-replace'), // 替换文件中的字符串
    webpackbaseconf = require('./build/webpack.base.conf'), // webpack打包
    config = require('./config/index.js'),
    inject = require('gulp-inject');


var debug = require('gulp-debug');

var ROOT = "./release/tmp";
// var htmls = "";

// if (config.dev.partialPackage) {
//     htmls = ROOT + '/page/' + webpackbaseconf.current + '.html'
// } else htmls = ROOT + '/page/**/*.html';
var SOURCE = {
    index: ROOT + '/index.html',
    img: ROOT + '/images/**/*',
    css: ROOT + '/css/**/*.css',
    js: ROOT + '/js/**/*.js',
    static_js: ROOT + '/static/js/**/*.js',
    static_css: ROOT + '/static/css/**/*.css',
    static_img: ROOT + '/static/images/**/*',
    static_audio: ROOT + '/static/audio/**/*',
    html: ROOT + '/page/**/*.html',
    check_health: "./check_health"
};

var DIST = "./release/min";

var DIST_HTML = DIST + "/page/**/*.html";


// 路径替换
gulp.task('replace_dev', function () {
    return gulp.src([SOURCE.index, SOURCE.css, SOURCE.html, SOURCE.js, SOURCE.static_js, SOURCE.static_css, SOURCE.static_audio], {base: ROOT})
        .pipe(replace(/\.\.\/static\/images\//g, 'http://api.l.whereask.com/one_pay/hercules/static/images/'))
        .pipe(replace(/\.\.\/static\/audio\//g, 'http://api.l.whereask.com/wechat_mini_game/hercules/static/audio/'))
        .pipe(replace(/\.\.\/\.\.\/file\//g, 'http://api.l.whereask.com/hot_pot_festival/hercules/static/'))
        .pipe(gulp.dest(DIST));
});

// 路径替换
gulp.task('replace_daily', function () {
    return gulp.src([SOURCE.index, SOURCE.css, SOURCE.html, SOURCE.js, SOURCE.static_js, SOURCE.static_css, SOURCE.static_audio], {base: ROOT})
        .pipe(replace(/\.\.\/static\/images\//g, 'http://api.l.whereask.com/daily/hercules/static/images/'))
        .pipe(replace(/\.\.\/static\/audio\//g, 'http://api.l.whereask.com/daily/hercules/static/audio/'))
        .pipe(gulp.dest(DIST));
});

// 路径替换
gulp.task('replace_pre', function () {
    return gulp.src([SOURCE.html, SOURCE.index, SOURCE.css, SOURCE.js, SOURCE.static_js, SOURCE.static_css, SOURCE.static_audio], {base: ROOT})
        .pipe(replace(/\.\.\/static\/images\//g, 'https://d.2dfire-pre.com/hercules/static/images/'))
        .pipe(replace(/\.\.\/static\/audio\//g, 'https://d.2dfire-pre.com/hercules/static/audio/'))
        .pipe(replace(/\.\.\/static\/css\//g, 'https://d.2dfire-pre.com/hercules/static/css/'))
        .pipe(replace(/\.\.\/static\/js\//g, 'https://d.2dfire-pre.com/hercules/static/js/'))
        .pipe(replace(/\.\.\/images\//g, 'https://d.2dfire-pre.com/hercules/images/'))
        .pipe(replace(/\.\.\/css\//g, 'https://d.2dfire-pre.com/hercules/css/'))
        .pipe(replace(/\.\.\/js\//g, 'https://d.2dfire-pre.com/hercules/js/'))
        // .pipe(replace(/\.\.\/\.\.\/api\/share\//g, 'http://meal.2dfire-pre.com/share/'))
        .pipe(replace(/\.\.\/\.\.\/meal\/page\//g, 'https://d.2dfire-pre.com/meal/page/'))
        .pipe(replace(/\.\.\/\.\.\/bill\/page\//g, 'https://d.2dfire-pre.com/bill/page/'))
        .pipe(replace(/\.\.\/\.\.\/om\/page\//g, 'https://d.2dfire-pre.com/om/page/'))
        .pipe(replace(/\.\.\/\.\.\/shop\/page\//g, 'https://d.2dfire-pre.com/shop/page/'))
        .pipe(replace(/\.\.\/page\//g, 'https://d.2dfire-pre.com/hercules/page/'))
        .pipe(replace(/\.\.\/\.\.\/file\//g, 'https://d.2dfire-pre.com/file/'))
        .pipe(replace("grunt_page_time", new Date().getTime()))
        .pipe(replace('grunt_env_dev', 'grunt_env_pre'))
        .pipe(gulp.dest(DIST));
});

// 路径替换
gulp.task('replace_publish', function () {
    return gulp.src([SOURCE.index, SOURCE.css, SOURCE.html, SOURCE.js, SOURCE.static_js, SOURCE.static_css, SOURCE.static_audio], {base: ROOT})
        .pipe(replace(/\.\.\/static\/images\//g, 'https://imgcdn.2dfire.com/hercules/static/images/'))
        .pipe(replace(/\.\.\/static\/audio\//g, 'https://imgcdn.2dfire.com/hercules/static/audio/'))
        .pipe(replace(/\.\.\/static\/css\//g, '//csscdn.2dfire.com/hercules/static/css/'))
        .pipe(replace(/\.\.\/static\/js\//g, '//jscdn.2dfire.com/hercules/static/js/'))
        .pipe(replace(/\.\.\/images\//g, 'https://imgcdn.2dfire.com/hercules/images/'))
        .pipe(replace(/\.\.\/css\//g, '//csscdn.2dfire.com/hercules/css/'))
        .pipe(replace(/\.\.\/js\//g, '//jscdn.2dfire.com/hercules/js/'))
        // .pipe(replace(/\.\.\/\.\.\/api\/share\//g, 'https://meal.2dfire.com/share/'))
        // .pipe(replace(/\.\.\/\.\.\/file\//g, 'https://d.2dfire.com//hercules/images/'))

        .pipe(replace(/\.\.\/\.\.\/meal\/page\//g, 'https://d.2dfire.com/meal/page/'))
        .pipe(replace(/\.\.\/\.\.\/bill\/page\//g, 'https://d.2dfire.com/bill/page/'))
        .pipe(replace(/\.\.\/\.\.\/om\/page\//g, 'https://d.2dfire.com/om/page/'))
        .pipe(replace(/\.\.\/\.\.\/shop\/page\//g, 'https://d.2dfire.com/shop/page/'))
        .pipe(replace(/\.\.\/\.\.\/file\//g, 'https://d.2dfire.com/file/'))
        // -- start --
        /*  
            * duhuo@2dfire  2017/07/21
            * 活动页面部署问题:
                -新活动部署在zm1717域名下,老活动仍在2dfire域名下。
                -TODO： 后期会将老活动也迁移到新域名下。
        */
        .pipe(replace(/\.\.\/page\/meetgame.html/g, 'http://d.zm1717.com/hercules/page/meetgame.html'))
        .pipe(replace(/\.\.\/page\//g, 'http://d.2dfire.com/hercules/page/'))
        // -- end --
        .pipe(replace("grunt_page_time", new Date().getTime()))
        .pipe(replace('grunt_env_dev', 'grunt_env_release'))
        .pipe(gulp.dest(DIST));
});

// 其他文件
gulp.task('cp_other_files', function () {
    return gulp.src(SOURCE.check_health)
        .pipe(gulp.dest(DIST));
});


// 清理目录 release
gulp.task('clean', function () {
    return gulp.src([DIST], {read: false})
        .pipe(clean());
});


// 图片处理, 压缩
gulp.task('min_img', function () {
    return gulp.src([SOURCE.img, SOURCE.static_img], {base: ROOT})
    // .pipe(imagemin())
        .pipe(gulp.dest(DIST));
});

// css处理, 压缩
gulp.task('min_css', function () {
    return gulp.src([SOURCE.css, SOURCE.static_css], {base: ROOT})
        .pipe(gulp.dest(DIST));
});

// js处理, 压缩
gulp.task('min_js', function () {
    return gulp.src([SOURCE.js, SOURCE.static_js], {base: ROOT})
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(gulp.dest(DIST));
});

// html处理
gulp.task("inject_html", function () {
    gulp.src([DIST_HTML], {base: DIST})
        .pipe(inject(gulp.src(['./node_modules/@2dfire/analytics-utils/*.html']), {
            starttag: '<!-- inject:{{path}} -->',
            transform: function (filePath, file) {
                return file.contents.toString('utf8')
            }
        }))
        .pipe(gulp.dest(DIST));
})

// 默认任务
gulp.task('default', function () {
    runsequence('build');
});

// 本地测试
gulp.task('build', function () {
    runsequence('clean', 'replace_dev', 'min_img', 'cp_other_files', "inject_html");
});

// 项目
gulp.task('dev', function () {
    runsequence('clean', 'replace_dev', 'min_img', 'cp_other_files', "inject_html");
});

// 日常
gulp.task('daily', function () {
    runsequence('clean', 'replace_daily', 'min_img', 'cp_other_files', "inject_html");
});

// 预发
gulp.task('pre', function () {
    runsequence('clean', 'replace_pre', 'min_img', 'cp_other_files', "inject_html");
});

// 线上
gulp.task('publish', function () {
    runsequence('clean', 'replace_publish', 'min_img', 'cp_other_files', "inject_html");
});