'use strict'
const fs = require('fs');
const path = require('path');
const mkdirsSync = require('../util/fsUtil').mkdirsSync;
module.exports = {
  initInput: (arr, cb) => {
      let i = 0;
      let inputObj = {};
      let len = arr.length;
      process.stdout.write(arr[i].desc);
      process.stdin.setEncoding('utf-8');
      process.stdin.on('data', chunk => {
        chunk = chunk.replace(/[\s\n\r]/g, '');
        inputObj[arr[i].key.toString()] = chunk;
        if (arr[i].key.toString() === 'name') {
          mkdirsSync(path.resolve(process.cwd(), chunk, 'config'));
        }
        if (len-- > 1) {
          process.stdout.write(arr[++i].desc)
        } else {
          process.stdin.pause();
          cb(inputObj);
        }
      });
    }
}