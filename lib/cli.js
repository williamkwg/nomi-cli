'use strict';
const version = require('../package.json').version;
module.exports = {
  run: option => {
     // 处理辅助命令
     if (option === '-v' || option === '--version') {
          console.log(`v${version}`);
          return;
      } else if (option === '-h' || option === '--help' || !option) {
          cli.help();
          return;
      }
  },
  help: () => {

  }
}