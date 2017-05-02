var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    maps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    responsive = require('gulp-responsive'),
    pump = require('pump');

// Working directories
var bases = {
    src: 'src/',
    dist: 'dist/'
};


// Paths to files
var paths = {
    html: ['index.html'],
    styles: ['scss/app.scss'],
    bowerDir: ['bower_components'],
    images: ['images']
}

// HTML
gulp.task('minifyHTML', function() {
    gulp.src(paths.html, { cwd: bases.src })
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(bases.dist))
});

//CSS
gulp.task('buildCSS', function() {
    gulp.src(paths.styles, { cwd: bases.src })
        .pipe(maps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            //where to import files from
            includePaths: [paths.bowerDir + 'bootstrap-sass/assets/stylesheets/'],
            precision: 8
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(maps.write('./'))
        .pipe(gulp.dest(bases.dist + '/css/'))
});

//JS
gulp.task('buildJS', function(cb) {
    pump([
            gulp.src([
                paths.bowerDir + '/jquery/dist/jquery.min.js',
                paths.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
                bases.src + 'js/helper.js',
                bases.src + 'js/resumeBuilder.js',
                bases.src + 'js/baffle.min.js',
                bases.src + 'js/app.js'
            ]),
            maps.init(),
            concat('app.min.js'),
            uglify(),
            maps.write('./'),
            gulp.dest(bases.dist + 'js/')
        ],
        cb
    );
});

// Make responsive images, output in src
gulp.task('resizeImages', function() {
    return gulp.src(paths.images + '/projectImages/**/*', { cwd: bases.src })
        .pipe(responsive({
            // Resize all JPG images
            '*.jpg': [{
                width: 600,
                rename: { suffix: '-600' },
            }, {
                width: 1200,
                rename: { suffix: '-1200' },
            }]
        }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 85,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
        }))
        .pipe(gulp.dest(bases.src + '/images/resized/'));
});

// Copy and move images to build folder
gulp.task('copyImages', ['resizeImages'], function() {
    gulp.src([paths.images + '/resized/**/*',
            paths.images + '/portrait/**/*'
        ], { cwd: bases.src })
        .pipe(gulp.dest(bases.dist + '/images/'));
});

// Watch tasks. Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(bases.src + "/js/**/*.js", ['buildJS']);
    gulp.watch(bases.src + "/scss/**/*.scss", ['buildCSS']);
    gulp.watch(bases.src + "/*.html", ['minifyHTML']);
})

gulp.task('build', ['copyImages', 'buildJS', 'buildCSS', 'minifyHTML'], function(done) {
    console.log("Page is built");
    done();
});

gulp.task('default', ['watch', 'build']);
