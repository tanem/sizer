'use strict';

var R = require('ramda');
var path = require('path');
var fs = require('fs');

var readFile = R.partialRight(fs.readFileSync, { encoding: 'utf-8' });
var getSourcePath = R.partial(path.join, __dirname, '../../lib');

global.getFixturesPath = R.partial(path.join, __dirname, '../fixtures');
global.readFixture = R.compose(readFile, getFixturesPath);
global.requireFixture = R.compose(require, getFixturesPath);
global.requireSource = R.compose(require, getSourcePath);
