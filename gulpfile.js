const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync').create();

const output = 'dist'

const sources = {
  lib: 'src/lib/**/*',
  statics: 'statics/**/*',
  pugs: 'src/pages/**/*.pug',
  stylus: 'src/pages/**/*.styl'
}

const handerError = err => {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('clean', () => {
  return del(output)
})

gulp.task('copy', () => {
  gulp.src(sources.lib)
    .pipe(gulp.dest(`${output}/lib/`))
  return gulp.src(sources.statics)
    .pipe(gulp.dest(`${output}/statics/`))
})

gulp.task('stylus', () => {
  return gulp.src(sources.stylus)
    .pipe($.stylus().on('error', handerError))
    .pipe(gulp.dest(output))
})

gulp.task('pug', () => {
  return gulp.src(sources.pugs)
    .pipe($.pug().on('errer', handerError))
    .pipe(gulp.dest(output))
})

gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: output
    }
  })
  // parallel, series
  gulp.watch(sources.lib, gulp.parallel('copy'))
  gulp.watch(sources.statics, gulp.parallel('copy'))
  gulp.watch(sources.pugs, gulp.parallel('pug'))
  gulp.watch(sources.stylus, gulp.parallel('stylus'))

})
