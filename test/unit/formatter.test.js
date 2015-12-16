import test from 'tape';
import * as formatter from '../../src/formatter';

test('should format the result as json', (t) => {

  t.plan(1);

  let actual = formatter.json(requireFixture('resultObject'));
  let expected = readFixture('jsonFormat.json');

  t.deepEqual(actual, expected, 'result should equal jsonFormat.json');

});

test('should format the result as human', (t) => {

  t.plan(1);

  let actual = formatter.human(requireFixture('resultObject'));
  let expected = readFixture('humanFormat.txt');

  t.deepEqual(actual, expected, 'result should equal humanFormat.txt');

});
