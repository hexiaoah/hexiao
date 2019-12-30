const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const clean = require('gulp-clean');

/**
 * 根据平台返回需要打包的文件
 * @param  {String} platform 平台 wxApp|web
 * @return {Array}
 */
const srcPlatform = platform => ([
    'src/*.js',
    'src/base/*.js',
    'src/utils/*.js',
    'src/platforms/' + platform + '/*.js',
]);

/**
 * 根据平台返回打包后文件的储存地址
 * @param  {String} platform 平台 wxApp|web
 * @return {String}
 */

const distPlatform = platform => platform === 'wxApp' ? 'wxApp' : '.';

/**
 * 打包方法工厂
 * @param  {String}  platform      平台 wxApp|web
 * @param  {Boolean} [watch=false] 是否watch
 * @return {Function}              返回打包方法
 */

const buildFactory = (platform, watch = false) => () => {
    const pipeable = watch
        ? gulp.watch(srcPlatform(platform))
        : gulp.src(srcPlatform(platform));
    return pipeable.pipe(babel())
        .pipe(replace(/require\('PLATFORM\//g, 'require\(\'./'))
        .pipe(replace(/require\(['"]\.(?:[\.\w\/])+\/([\w\.]+)['"]\)/g, 'require(\'./$1\')'))
        .pipe(rename({ dirname: '.' }))
        .pipe(gulp.dest(distPlatform(platform)));
};

gulp.task('clean', function () {
    return gulp.src(['wxApp', '*.js', '!gulpfile.js'])
        .pipe(clean());
});

gulp.task('web', buildFactory('web'));
gulp.task('wxApp', buildFactory('wxApp'));
gulp.task('watch:web', ['web'], buildFactory('web', true));
gulp.task('watch:wxApp', ['wxApp'], buildFactory('wxApp', true));

gulp.task('build', ['clean'], () => {
    return gulp.start('web', 'wxApp');
});
gulp.task('watch', ['watch:web', 'watch:wxApp']);
gulp.task('default', ['build']);
