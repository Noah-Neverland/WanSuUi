const path = require('path');
const gulp = require('gulp');
const gulpTS = require('gulp-typescript');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const tsConfig = require('./tsconfig.build.json');

const ROOT_DIR = path.resolve(__dirname, '..', 'src/components');

function compileTS({isESM}) {
  const tsStream = gulp.src(`${ROOT_DIR}/**/*.tsx`).pipe(
    gulpTS({
      ...tsConfig.compilerOptions,
      declaration: isESM,
      module: isESM ? 'ESnext' : 'commonjs',
    })
  );

  return tsStream.js.pipe(
    gulp.dest(path.resolve(__dirname, '..', isESM ? 'es' : 'lib'))
  );
}

gulp.task('buildStyles', function buildStyles() {
  return gulp
    .src(`${ROOT_DIR}/**/*.scss`)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.resolve(__dirname, '..', 'es')))
    .pipe(gulp.dest(path.resolve(__dirname, '..', 'lib')));
});

gulp.task('buildDts', function buildDts() {
  const tsStream = gulp.src(`${ROOT_DIR}/**/*.tsx`).pipe(
    gulpTS({
      ...tsConfig.compilerOptions,
      isolatedModules: false,
    })
  );

  return tsStream.dts.pipe(gulp.dest(path.resolve(__dirname, '..', 'es')));
});

gulp.task('compileTSXForESM', function compileTSXForESM() {
  return compileTS({isESM: true});
});

gulp.task('compileTSXForCJS', function compileTSXForESM() {
  return compileTS({isESM: false});
});

gulp.task('clean', function clean() {
  return del(
    [path.resolve(__dirname, '..', 'es'), path.resolve(__dirname, '..', 'lib')],
    {force: true}
  );
});

gulp.task(
  'compile',
  gulp.series([
    'clean',
    gulp.parallel('compileTSXForESM', 'compileTSXForCJS'),
    'buildDts',
    'buildStyles',
  ])
);
