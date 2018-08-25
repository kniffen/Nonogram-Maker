const gulp    = require('gulp')
const plumber = require('gulp-plumber')
const babel   = require('gulp-babel')
const bro     = require('gulp-bro')

gulp.task('js', function() {
  gulp.src('src/app.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(bro())
    .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.*', {cwd: './'}, ['js'])
})

gulp.task('default', ['watch', 'js'])