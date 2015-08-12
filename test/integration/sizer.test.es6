'use strict';

import test from 'tape';
import sizer from '../..';

test('should generate a json report by default', (t) => {

  t.plan(2);

  let expected = readFixture('jsonFormat.json');

  sizer({
    glob: 'test/fixtures/{chalk,co,glob}.js',
    done: (error, result) => {
      t.equal(null, error, 'error should be null');
      t.deepEqual(result, expected, 'result should equal jsonFormat.json');
    }
  });

});

test('should generate a human report', (t) => {

  t.plan(2);

  let expected = readFixture('humanFormat.txt');

  sizer({
    glob: 'test/fixtures/{chalk,co,glob}.js',
    format: 'human',
    done: (error, result) => {
      t.equal(null, error, 'error should be null');
      t.deepEqual(result, expected, 'result should equal humanFormat.txt');
    }
  });

});