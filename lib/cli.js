'use strict';
const { initCMD, bulidCMD } = require('./commands/init');
const { helpCMD, versionCMD } = require('./commands/help');
const cli = {
  run: option => {
    // 处理辅助命令
    if (option === '-v' || option === '--version') {
      cli.version();
      return;
    } else if (option === '-h' || option === '--help' || !option) {
      cli.help();
      return;
    } else if (option === 'init' || option === 'bulid') {
      cli[option]();
      return;
    } else {
    }
  },
  version: () => { versionCMD() },
  help: () => { helpCMD() },
  init: () => { initCMD() },
  bulid: () => { bulidCMD() }
};
module.exports = cli;