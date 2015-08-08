'use strict';

var Promise = require('promise');
var co = require('co');
var glob = require('glob');
var fs = require('fs');
var uglifyJS = require('uglify-js');
var zlib = require('zlib');
var R = require('ramda');
var format = require('./format');

var getSize = R.compose(require('pretty-bytes'), R.prop('length'));
var getFilePaths = Promise.denodeify(glob);
var readFile = R.partialRight(Promise.denodeify(fs.readFile), { encoding: 'utf-8' });
var gzip = R.partialRight(Promise.denodeify(zlib.gzip), { level: 9 });
var uglify = R.compose(Promise.resolve, R.prop('code'), R.partialRight(uglifyJS.minify, { fromString: true }));

module.exports = function sizer(options) {

  options = options || {};
  var done = options.done || function (){};

  co(function* () {
    var filePaths = yield getFilePaths(options.glob);
    var resultObject = yield filePaths.reduce(function (memo, filePath) {
      memo[filePath] = function* () {

        var originalContent = yield readFile(filePath);
        var uglifiedContent = yield uglify(originalContent);
        var gzippedContent = yield gzip(uglifiedContent);

        return {
          originalSize: getSize(originalContent),
          uglifiedSize: getSize(uglifiedContent),
          gzippedSize: getSize(gzippedContent)
        };

      };
      return memo;
    }, {});
    return format[options.format || 'json'](resultObject);
  }).then(R.partial(done, null), done);

};
