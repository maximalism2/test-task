'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var scsslint = require('gulp-scss-lint');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var path = require('path');
var webpackProductionConfig = require('./webpack.production.config');

const lintScss = [
  './src/styles/**/*.scss'
];

gulp.task('build:css', [], () => {
  let penv = process.env;
  let NODE_ENV = penv.NODE_ENV ? penv.NODE_ENV : 'development';
  if (NODE_ENV === 'production') {
    return gulp.src('./src/styles/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./dist/styles'))
      .pipe(minifyCss())
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest('./dist/styles'))
  } else {
    return gulp.src('./src/styles/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./dist/styles'))
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest('./dist/styles'))
  }
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/styles/**/*.scss', ['build:css']);
});

gulp.task('webpack', () => {
  webpack(webpackProductionConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
  })
});

gulp.task('webpack-dev-server', (cb) => {
  let compiler = webpack(webpackConfig);
  new webpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    proxy: {
      '/': {
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request. /*');
            return `/index.html`;
          }
        }
      }
    }
  }).listen((process.env.PORT || 8000), 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:8000');
  });
});

gulp.task('default', ['build:css', 'webpack']);
gulp.task('hot', ['sass:watch', 'webpack-dev-server']);
