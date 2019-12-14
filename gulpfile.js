var gulp = require ('gulp'),
    pug = require ('gulp-pug'),
    sass = require ('gulp-sass'),
    plumber  = require ('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    concat  = require ('gulp-concat'),
    sourcemaps  = require ('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    uglify  = require ('gulp-uglify'),
    imagemin = require ('gulp-imagemin'),
    watch = require ('gulp-watch');

gulp.task('pug', () => {
    return gulp.src('./src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('sass', () => {
    gulp.src('./src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
    });

gulp.task('js', () => {
    return gulp.src('./src/js/partials/*.js')
        .pipe(plumber())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});

gulp.task('imagemin', () => {
    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: './dist',
        port: 8000,
        livereload: true
    });
});

gulp.task('watch', () => {
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/partials/*.js', ['js']);
    gulp.watch('./src/img/**/*.*', ['imagemin']);
});

gulp.task('default', ['connect', 'watch']);