var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    minify = require('gulp-minify'),
    lost = require('lost'),
    svg = require('postcss-inline-svg'),
    svgo = require('postcss-svgo');;

var paths = {
  cssSource: 'source/style/',
  cssDestination: 'dist/css/',
  jsSource: 'source/js/'
};

gulp.task('sprite', function () {
  var spriteData = gulp.src('./source/img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../image/sprite.png',
    padding: 5
  }));
  spriteData.img.pipe(gulp.dest('./dist/image/')); // ����, ���� ��������� ��������
  spriteData.css.pipe(gulp.dest('./source/style/')); // ����, ���� ��������� �����
});

gulp.task('styles', function() {
  return gulp.src(paths.cssSource + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      svg(),
      svgo(),
      lost(),
      autoprefixer()
    ]))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.task('img-min', () =>
gulp.src('./source/img/*.*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/image/'))
);

gulp.task('compress', function() {
  gulp.src('./source/js/*.js')
    .pipe(minify({
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./dist/js/'))
});

gulp.watch(paths.cssSource + '**/*.scss', ['styles', 'compress']);

gulp.task('default', ['styles']);
