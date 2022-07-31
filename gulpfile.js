'use strict'

// gulpとgaulp sassのライブラリーを読み込み
var { src, watch, dest, series } = require('gulp');
var sass = require('gulp-sass')(require('sass'));

// タスク「sassBuild」を関数で定義
// _src/sass/の下の全てのフォルダの拡張子「.scss」のファイルが対象となる
// アウトプット形式は「expanded」
// ビルドしたcssファイルはルート直下のcssファイルに
const sassBuild = (done) => {
  src('./_src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(dest('./css'));
  done();
};

// タスク「watchScss」を関数で定義
// _src/sass/の下の全てのフォルダの拡張子「.scss」のファイルを監視して、変化があればsassBuidlを行う
const watchScss = () => {
  watch('./_src/sass/**/*.scss', sassBuild);
};

// series関数で、デフォルトタスクに「sassBuild」と「watchScss」を設定し、順番に実行する
// タスク名を選択せずに「gulp」をするだけで両方行われる
exports.default = series(sassBuild, watchScss);
exports.build = sassBuild;
