const concat = require('gulp-concat')
const gulp = require('gulp')
const iife = require("gulp-iife")
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const babel = require('gulp-babel');
const plug = require('gulp-load-plugins')()
const replace = require('gulp-replace')
const browserify = require('gulp-browserify')
const rename = require('gulp-rename')
const templateCache = require('gulp-angular-templatecache')
const autoPrefixer  = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const nodemon = require('gulp-nodemon')
const gulpCopy = require('gulp-copy')
const del = require('del')
const assets = { fonts: './src/client/vendors/fonts/*', img: './src/client/vendors/img/*'}
const clientFiles = ['./src/client/app.js', './src/client/components/**/**.js', './src/client/config/**.js', './src/client/services/**.js', './src/client/factory/**.js']
const sassFiles = 'src/client/vedors/sass/*.scss'
const templates = './src/client/**/**.html'
const scssFile = './src/client/vendors/index.scss'
const indexHtml = './src/client/index.edge'

const interceptErrors = function(error) {
    var args = Array.prototype.slice.call(arguments)
  
    // Send error to notification center with gulp-notify
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args)
  
    // Keep gulp from hanging on this task
    this.emit('end')
}
const public = {
    css: './src/client/vendors/css/**.css',
    js: './src/client/vendors/js/**.js',
    iife: './src/client/vendors/iife/**.js'
}
const server = { 
    js: './src/server/index.js',
    html: './src/client/index.html'
}

gulp.task('clean', () => 
    del('./resources')
)

gulp.task('main',  () =>
    gulp.src(clientFiles)
        .pipe(browserify({
            insertGlobals : true
        }))
      .pipe(iife())
      .pipe(concat('main.js'))
      .pipe(gulp.dest('./public/js'))
)

gulp.task('template', () =>
    gulp.src(templates)
        .pipe(templateCache({
            transformUrl: function(url) {
                return url.replace(/components\//, '')
            },
            standalone: true
        }))
        .pipe(iife())
        .pipe(gulp.dest('./public/js'))
)

/* gulp.task('server-index-js', () => 
    gulp.src(server.js).pipe(gulp.dest('./dist/server'))
) */

gulp.task('vendor:css', () =>
    gulp.src(public.css)
        .pipe(gulp.dest('./public/css'))
)

gulp.task('vendor:js', () =>
    gulp.src(public.js)
        .pipe(gulp.dest('./public/js'))
)

gulp.task('vendor:iife', () =>
    gulp.src(public.iife)
        .pipe(gulp.dest('./public/iife'))
)

gulp.task('public', ['vendor:js', 'vendor:css', 'vendor:iife', 'sass'])

gulp.task('inject', () => {
    const target = gulp.src(indexHtml)
	const sources = gulp.src(['./public/iife/**.js', './public/js/**.js', './public/css/**.css'])
    return target.pipe(plug.inject(sources), {read: false})
        .pipe(replace('/public/', ''))
        .pipe(gulp.dest('./resources/views'))
})

gulp.task('sass', () =>
    gulp.src(scssFile)
        .pipe(sass({ precision: 10 }))
        .on('error', interceptErrors)
        .pipe(autoPrefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
        .pipe(gulp.dest('./public/css'))
)

gulp.task('nodemon', () => 
  nodemon({
    script: './server.js',
    watch:['resources/**/*.*', 'public/**/*.*', 'start/*.*', 'database/*.*' , 'config/*.*', 'app/**'],
    env: {'NODE_ENV': 'local'},
  }).on('start')
)

gulp.task('cp-fonts', () =>
    gulp
        .src(assets.fonts)
        .pipe(gulp.dest('./public/fonts'))
)
gulp.task('cp-img', () =>
    gulp
        .src(assets.img)
        .pipe(gulp.dest('./public/img'))
)

gulp.task('default', function() {
    return runSequence('clean', ['cp-fonts', 'cp-img'], 'public', 'template', 'main', 'inject', 'nodemon', () => {
        gulp.watch(assets.font, ['cp-fonts'])
        gulp.watch(assets.img, ['sass'])
        gulp.watch(scssFile, ['cp-fonts'])
        gulp.watch(clientFiles, ['main'])
        gulp.watch(indexHtml, ['inject'])
    })
})
