# sizer

[![Build Status](https://travis-ci.org/tanem/sizer.png?branch=master)](https://travis-ci.org/tanem/sizer)

Generate a report of the original, uglified, and gzipped sizes of a set of JavaScript files.

## Installation

```
$ npm install sizer
```

## Usage

```js
var sizer = require('sizer');

sizer({
  glob: 'test/fixtures/{chalk,co,glob}.js',
  format: 'human',
  done: function (error, result) {
    if (error) return console.error(error.stack);
    console.log(result);
  }
});
```

## API

```js
var sizer = require('sizer');
```

### `sizer(options)`

`options.glob` is a required [glob](https://github.com/isaacs/node-glob) specifying which JavaScript files to report on.

`options.format` is an optional string specifying which built-in report format to use ([`json`](test/fixtures/jsonFormat.json) or [`human`](test/fixtures/humanFormat.txt)). Defaults to `json`.

`options.done` is an optional function to execute when the report is complete. It gets passed an `error` (which can be `null`) and the formatted `result`.

## Tests

```
$ npm test
```

## License

MIT