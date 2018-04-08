'use strict';
const version = require('../package.json').version;
const initCMD = require('./commands/init');
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
      return;
    }
  },
  help: () => {
  },
  init: () => {
    initCMD();
  }
};
module.exports = cli;