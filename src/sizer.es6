'use strict';

import Promise from 'promise';
import co from 'co';
import glob from 'glob';
import fs from 'fs';
import uglifyJS from 'uglify-js';
import zlib from 'zlib';
import R from 'ramda';
import prettyBytes from 'pretty-bytes';
import * as formatter from './formatter';

let getSize = R.compose(prettyBytes, R.prop('length'));
let getFilePaths = Promise.denodeify(glob);
let readFile = R.partialRight(Promise.denodeify(fs.readFile), { encoding: 'utf-8' });
let gzip = R.partialRight(Promise.denodeify(zlib.gzip), { level: 9 });
let uglify = R.compose(Promise.resolve, R.prop('code'), R.partialRight(uglifyJS.minify, { fromString: true }));

module.exports = function sizer({ glob, format = 'json', done = () => {} }) {
  co(function* () {
    let filePaths = yield getFilePaths(glob);
    let resultObject = yield filePaths.reduce(function (memo, filePath) {
      memo[filePath] = function* () {

        let originalContent = yield readFile(filePath);
        let uglifiedContent = yield uglify(originalContent);
        let gzippedContent = yield gzip(uglifiedContent);

        return {
          originalSize: getSize(originalContent),
          uglifiedSize: getSize(uglifiedContent),
          gzippedSize: getSize(gzippedContent)
        };

      };
      return memo;
    }, {});
    return formatter[format](resultObject);
  }).then(R.partial(done, null), done);
};
