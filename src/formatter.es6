'use strict';

import R from 'ramda';
import chalk from 'chalk';

export let json = R.partialRight(JSON.stringify, null, 2);

export function human(obj, str = '') {
  R.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      str += `\n${chalk.blue.bold(key)}\n`;
      str = human(obj[key], str);
    } else {
      str += `  ${key}: ${obj[key]}\n`;
    }
  });
  return str;
};
