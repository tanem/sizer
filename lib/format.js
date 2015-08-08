'use strict';

var R = require('ramda');
var chalk = require('chalk');

exports.json = R.partialRight(JSON.stringify, null, 2);

exports.human = function human(resultObject, str) {
  str = str || '';
  R.keys(resultObject).forEach(function (filePath) {
    if (typeof resultObject[filePath] === 'object') {
      str += '\n' + chalk.blue.bold(filePath) + '\n';
      str = human(resultObject[filePath], str);
    } else {
      str += '  ' + filePath + ': ' + resultObject[filePath] + '\n';
    }
  });
  return str;
};
