'use strict';
const fs = require('fs');
const path = require('path');
const version = require('../package.json').version;
const fsUtil = require('./util/fsUtil');
const cli = {
  run: option => {
    // 处理辅助命令
    if (option === '-v' || option === '--version') {
    process.stdout.write(`v${version}`)
    return;
    } else if (option === '-h' || option === '--help' || !option) {
    cli.help();
    return;
    } else if (option === 'init') {
    cli.init();
    }
  },
  help: () => {

  },
  init: () => {
    fsUtil.copyFolder(path.resolve(__dirname, '../template'), process.cwd());
  }
};
module.exports = cli;