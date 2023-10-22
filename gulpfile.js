const {src, dest} = require('gulp');
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const scss = require('gulp-sass')(require('sass'));
const cssbeatify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
// const panini = require('panini');
const imagemin = require('gulp-imagemin');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


const srcPath = "src/"
const distPath = "dist/"

const path = {
    build: {
        html: distPath,
        css: distPath + "css",
        js: distPath + "js",
        images: distPath + "images",
        fonts: distPath + "fonts"
    },
    src: {
        html: srcPath + "*.html",
        css: srcPath + "scss/**/*.scss",
        cssNormalize: srcPath + "scss/**/normalize.css",
        js: srcPath + "js/*.js",
        images: srcPath + "images/**/*.{jpeg,jpg,png,svg,gif,ico,webp}",
        fonts: srcPath + "fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch: {
        html: srcPath + "**/*.html",
        css: srcPath + "scss/**/*.scss",
        js: srcPath + "js/*.js",
        images: srcPath + "images/**/*.{jpeg,jpg,png,svg,gif,ico,webp}",
        fonts: srcPath + "fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean: "./" + distPath
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./" + distPath
        }
    });
}

function html() {
    // panini.refresh()
    return src(path.src.html, {base: srcPath})
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "HTML Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end')
            }
        }))
    //     .pipe(panini({
    //         root: srcPath,
    //         layouts: srcPath + "tpl/layouts/",
    //         partials: srcPath + "tpl/partials/"
    //     }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(path.src.js, {base: srcPath} + "js/")
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "Js Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end')
            }
        }))
        .pipe(concat('main.js'))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix:".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}

function styles() {
    return src(path.src.css, {base: srcPath} + "scss/")
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: "CSS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                this.emit('end')
            }
        }))
        .pipe(scss())
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
        .pipe(cssbeatify())
        .pipe(concat('style.css'))
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}

function normalize() {
    return src(path.src.cssNormalize, {base: srcPath + "scss/"})
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}

function img() {
    return src(path.src.images, {base: srcPath + "images/"})
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.images))
        .pipe(browserSync.stream());
}

function fonts () {
    return src(path.src.fonts, {base: srcPath + "fonts/"})
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream());
}

function clean() {
    return del (path.clean)
}

function watchfiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], styles)
    gulp.watch([path.watch.js], scripts)
    gulp.watch([path.watch.images], img)
    gulp.watch([path.watch.fonts], fonts)
}



const build = gulp.series(clean, gulp.parallel(html, styles, scripts, img, fonts, normalize))
const watch = gulp.parallel(build, watchfiles, serve)

function deploy() {
    return src('./dist/**/*')
        .pipe(ghPages());
}

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.img = img;
exports.fonts = fonts;
exports.clean = clean;
exports.deploy = deploy;
exports.build = build;
exports.watch = watch;
exports.default = watch;