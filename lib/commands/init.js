const path = require('path');
const fsUtil = require('../util/fsUtil');
const INIT = require('../../config').INIT;
const INITS = require('lodash').keys(INIT);
let config = require('../../template/config/config.default');
module.exports = () => {
  process.stdout.write(INIT.name.desc);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => {
    chunk = chunk.replace(/[\s\n\r]/g, '');
    config.name = chunk;
    process.exit();
  });
  fsUtil.copyFolder(path.resolve(__dirname, '../../template'), process.cwd());
}