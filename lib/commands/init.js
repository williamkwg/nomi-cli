const path = require('path');
const fsUtil = require('../util/fsUtil');
module.exports = () => {
  fsUtil.copyFolder(path.resolve(__dirname, '../../template'), process.cwd());
}