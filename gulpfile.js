const gulp = require('gulp')
const shell = require('gulp-shell')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const changed = require('gulp-changed')
const merge = require('merge-stream')
const rename = require('gulp-rename')
const minifyHTML = require('gulp-minify-html')
const sourcemaps = require('gulp-sourcemaps')
const webpack = require('gulp-webpack')
const streamqueue = require('streamqueue')
const livereload = require('gulp-livereload')
const webserver = require('gulp-webserver')
const ftp = require('gulp-ftp')
const run_sequence = require('run-sequence')

const distPath = "./dist"
const webpack_conf = require('./webpack.config.js')
const webpack_conf_es3 = require('./webpack.config_es3.js')

gulp.task('server', function () {
    gulp.src('.')
        .pipe(webserver({
            port: 2016,
            open: true,
            proxies: [{
                source: '/api',
                target: 'http://192.168.100.239:8088'
            }]
        }))
})

gulp.task('js', function () {
    return gulp.src('scripts/index.js')
        .pipe(webpack(webpack_conf))
        .pipe(rename('index.pack.js'))
        .pipe(gulp.dest('build'))
})

gulp.task('js_watch', ["js"], function () {
    gulp.watch('scripts/**/*.js', ["js"])
})

gulp.task('sass', function () {
    var stream = gulp.src('content/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('content'))
        .pipe(livereload())
    return stream
})

gulp.task('sass_watch', ["sass"], function () {
    livereload.listen()
    gulp.watch('content/**/*.scss', ["sass"])
})

gulp.task('vendor', function () {
    return gulp.src([
            'node_modules/react/dist/react.js',
            'node_modules/react-dom/dist/react-dom.js',
            'node_modules/react-router/umd/ReactRouter.js',
            'node_modules/react-radio/dist/react-radio-group.js',
            // 'cook/jquery.js', // grunt custom:-deprecated,ajax/jsonp,ajax/script,-effects,-core/ready
            'bower_components/jquery/dist/jquery.js',
            'bower_components/lodash/dist/lodash.js',
            'bower_components/jquery-validation/dist/jquery.validate.js',
            "bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
            'bower_components/select2/dist/js/select2.js',
            'bower_components/select2/dist/js/i18n/zh-CN.js',
            'bower_components/moment/moment.js',
            'bower_components/moment/locale/zh-cn.js',
            'bower_components/pikaday/pikaday.js',
            'bower_components/zeroclipboard/dist/zeroclipboard.js',
            'bower_components/handsontable/dist/handsontable.js', // for es5
            'bower_components/bootstrap-table/dist/bootstrap-table.js',
            'bower_components/bootstrap-table/dist/locale/bootstrap-table-zh-CN.js',
            'node_modules/echarts/dist/echarts.js',
            'bower_components/nouislider/distribute/nouislider.js',
            'cook/wNumb.js',
            'cook/fine-uploader/jquery.fine-uploader.js',
            'node_modules/pnotify/src/pnotify.js',
            'node_modules/pnotify/src/pnotify.mobile.js',
            'node_modules/pnotify/src/pnotify.buttons.js',
            'node_modules/pnotify/src/pnotify.confirm.js',
            'node_modules/babel-polyfill/dist/polyfill.js',
        ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('.'))
})

// Release
gulp.task('up_version', function () {
    shell("npm version patch")
})

gulp.task('js_rel', ["up_version"], function () {
    return merge(
        gulp.src('scripts/index.js')
            .pipe(webpack(webpack_conf))
            .pipe(sourcemaps.init())
            .pipe(rename('index.pack.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(distPath + '/build'))
        ,
        gulp.src('scripts/index.js')
            .pipe(webpack(webpack_conf_es3))
            .pipe(sourcemaps.init())
            .pipe(rename('index_es3.pack.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(distPath + '/build'))
    )
})

gulp.task('sass_rel', function () {
    return gulp.src('content/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(distPath + '/content'))
})

gulp.task('uglify', function () {
    return merge(
        gulp.src('cook/wNumb.js')
            .pipe(uglify())
            .pipe(rename('wNumb.min.js'))
            .pipe(gulp.dest("cook"))
    )
})

gulp.task('vendor_rel', ["uglify"], function () {
    return merge(
        gulp.src([
                'node_modules/react/dist/react.min.js',
                'node_modules/react-dom/dist/react-dom.min.js',
                'node_modules/react-router/umd/ReactRouter.min.js',
                'node_modules/react-radio/dist/react-radio-group.min.js',
                // 'cook/jquery.min.js',
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/lodash/dist/lodash.min.js',
                'bower_components/jquery-validation/dist/jquery.validate.min.js',
                "bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js",
                'bower_components/select2/dist/js/select2.min.js',
                'bower_components/select2/dist/js/i18n/zh-CN.js',
                'bower_components/moment/min/moment.min.js',
                'bower_components/moment/locale/zh-cn.js',
                'bower_components/pikaday/pikaday.min.js',
                'bower_components/zeroclipboard/dist/zeroclipboard.min.js',
                'bower_components/handsontable/dist/handsontable.min.js',
                'bower_components/bootstrap-table/dist/bootstrap-table.min.js',
                'bower_components/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js',
                'node_modules/echarts/dist/echarts.min.js',
                'bower_components/nouislider/distribute/nouislider.min.js',
                'cook/wNumb.min.js',
                'cook/fine-uploader/jquery.fine-uploader.min.js',
                'node_modules/pnotify/dist/pnotify.js',
                'node_modules/pnotify/dist/pnotify.mobile.js',
                'node_modules/pnotify/dist/pnotify.buttons.js',
                'node_modules/pnotify/dist/pnotify.confirm.js',
                'node_modules/babel-polyfill/dist/polyfill.min.js',
            ])
            .pipe(concat('vendors.js'))
            .pipe(gulp.dest(distPath))
        ,
        gulp.src('images/**/*')
            .pipe(gulp.dest(distPath + '/images'))
    )
})

gulp.task('html_rel', function () {
    return gulp.src('./*.html')
        .pipe(minifyHTML({
            conditionals: true,
            spare: true
        }))
        .pipe(gulp.dest(distPath))
})

gulp.task('conf_office', function () {
    gulp.src('config.office.js')
        .pipe(rename('config.js'))
        .pipe(gulp.dest('scripts'))
})

gulp.task('conf_mock', function () {
    gulp.src('config.mock.js')
        .pipe(rename('config.js'))
        .pipe(gulp.dest('scripts'))
})

gulp.task('conf_rel', function () {
    gulp.src('config.release.js')
        .pipe(rename('config.js'))
        .pipe(gulp.dest('scripts'))
})

gulp.task('fix_react_radio_group', function () {
    return merge(
        gulp.src([
                'cook/react-radio-group.js'
            ])
            .pipe(gulp.dest('node_modules/react-radio/dist'))
        ,
        gulp.src([
                'cook/react-radio-group.min.js'
            ])
            .pipe(gulp.dest('node_modules/react-radio/dist'))
    )
})

gulp.task('fix_pikaday', function () {
    return gulp.src('bower_components/pikaday/pikaday.js')
        .pipe(uglify())
        .pipe(rename('pikaday.min.js'))
        .pipe(gulp.dest("bower_components/pikaday"))
})

gulp.task('fix', ['fix_react_radio_group', 'fix_pikaday'])
gulp.task('default', ['fix', 'sass'], function () {
    run_sequence('vendor', 'js')
})

gulp.task('watch', ['js_watch', 'sass_watch'])

gulp.task('release', ['conf_rel', 'sass_rel', 'vendor_rel', 'html_rel'], function () {
    run_sequence('js_rel', 'ftp')
})

gulp.task('ftp', function () {
    // gulp.src(distPath + '/**/*.{jpg}') //.{svg,ttf,eot,woff,woff2}
    gulp.src(distPath + '/**/*.*')
        .pipe(ftp({
            host: '192.168.100.4',
            user: 'root',
            pass: '12345678',
            remotePath: "/" // /opt/broada/wlb/html
        }))
})
