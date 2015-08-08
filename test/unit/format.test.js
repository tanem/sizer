'use strict';

var test = require('tape');
var format = requireSource('format');

test('should format the result as json', function(t){

  t.plan(1);

  var actual = format.json(requireFixture('resultObject'));
  var expected = readFixture('jsonFormat.json');

  t.deepEqual(actual, expected, 'result should equal jsonFormat.json');

});

test('should format the result as human', function(t){

  t.plan(1);

  var actual = format.human(requireFixture('resultObject'));
  var expected = readFixture('humanFormat.txt');

  t.deepEqual(actual, expected, 'result should equal humanFormat.txt');

});