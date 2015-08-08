# sizer

[![Build Status](https://travis-ci.org/tanem/sizer.png?branch=master)](https://travis-ci.org/tanem/sizer)

Generate a report of the original, uglified, and gzipped sizes of a set of JavaScript files.

## Requirements

- Node.js version 0.11.x (for the `harmony` flag which exposes [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)).

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

![](https://raw.github.com/tanem/sizer/master/screenshot.png)

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