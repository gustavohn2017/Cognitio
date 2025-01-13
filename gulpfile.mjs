import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

// Função para carregar gulp-imagemin dinamicamente
async function loadImagemin() {
    const imagemin = await import('gulp-imagemin');
    return imagemin.default;
}

const sass = gulpSass(dartSass);

function styles() {
    return gulp.src('src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'));
}

function scripts() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/scripts'));
}

async function images() {
    const imagemin = await loadImagemin();
    return gulp.src('src/images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

function html() {
    return gulp.src('src/views/**/*.html')
        .pipe(gulp.dest('dist/views'));
}

function watch() {
    gulp.watch('src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('src/scripts/**/*.js', gulp.parallel(scripts));
    gulp.watch('src/images/**/*.{png,jpg,jpeg,gif,svg}', gulp.parallel(images));
    gulp.watch('src/views/**/*.html', gulp.parallel(html));
}

export { styles, scripts, images, watch, html };

const build = gulp.parallel(styles, scripts, images, html);
gulp.task('build', build);
gulp.task('default', gulp.series(build, watch));
