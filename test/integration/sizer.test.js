'use strict';

var test = require('tape');
var sizer = requireSource('sizer');

test('should generate a json report by default', function (t) {

  t.plan(2);

  var expected = readFixture('jsonFormat.json');

  sizer({
    glob: 'test/fixtures/{chalk,co,glob}.js',
    done: function(error, result){
      t.equal(null, error, 'error should be null');
      t.deepEqual(result, expected, 'result should equal jsonFormat.json');
    }
  });

});

test('should generate a human report', function (t) {

  t.plan(2);

  var expected = readFixture('humanFormat.txt');

  sizer({
    glob: 'test/fixtures/{chalk,co,glob}.js',
    format: 'human',
    done: function(error, result){
      t.equal(null, error, 'error should be null');
      t.deepEqual(result, expected, 'result should equal humanFormat.txt');
    }
  });

});