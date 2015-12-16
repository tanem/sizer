import R from 'ramda';
import path from 'path';
import fs  from 'fs';

let readFile = R.partialRight(fs.readFileSync, { encoding: 'utf-8' });

global.getFixturesPath = R.partial(path.join, __dirname, '../fixtures');
global.readFixture = R.compose(readFile, getFixturesPath);
global.requireFixture = R.compose(require, getFixturesPath);
