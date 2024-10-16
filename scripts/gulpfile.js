const path = require('path');
const gulp = require('gulp');
const gulpTS = require('gulp-typescript');
const sass = require('gulp-sass')(require('sass'));
const merge = require('merge2');
const del = require('del');
const tsConfig = require('./tsconfig.build.json');

const ROOT_DIR = path.resolve(__dirname, '..', 'src/components');

// const tsProject = gulpTS.createProject('./tsconfig.build.json', {
//   module: 'commonjs',
// });

function compileTS({isESM}) {
  const tsStream = gulp.src(`${ROOT_DIR}/**/*.tsx`).pipe(
    gulpTS({
      ...tsConfig.compilerOptions,
      declaration: isESM,
      emitDeclarationOnly: isESM,
      module: isESM ? 'ESnext' : 'commonjs',
    })
  );
  // const tsStream = tsProject.src().pipe(tsProject());

  if (isESM) {
    // return tsStream.js.pipe(gulp.dest(path.resolve(__dirname, '..', 'es2/')));
    return merge([
      tsStream.js.pipe(gulp.dest(path.resolve(__dirname, '..', 'es'))),
      // tsStream.dts.pipe(gulp.dest(path.resolve(__dirname, '..', 'es'))),
    ]);
  } else {
    return tsStream.js.pipe(gulp.dest(path.resolve(__dirname, '..', 'lib')));
  }
}

function buildStyles(isESM) {
  const targetDir = isESM ? 'es' : 'lib';
  return gulp
    .src(`${ROOT_DIR}/**/*.scss`)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(path.resolve(__dirname, '..', targetDir)));
}

gulp.task('compileTSXForESM', function compileTSXForESM() {
  return compileTS({isESM: true});
});

gulp.task('compileTSXForCJS', function compileTSXForESM() {
  return compileTS({isESM: false});
});

gulp.task('moveScssForESM', function moveScssForESM() {
  return buildStyles(true);
});

gulp.task('moveScssForCJS', function moveScssForCJS() {
  return buildStyles(false);
});

gulp.task('clean', function clean() {
  return del(
    [path.resolve(__dirname, '..', 'es'), path.resolve(__dirname, '..', 'lib')],
    {force: true}
  );
});

exports.compile = gulp.series([
  'clean',
  gulp.parallel('compileTSXForESM', 'compileTSXForCJS'),
  gulp.parallel('moveScssForESM', 'moveScssForCJS'),
]);
