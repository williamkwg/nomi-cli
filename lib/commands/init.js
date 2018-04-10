const path = require('path');
const fs = require('fs');
const fsUtil = require('../util/fsUtil');
const { INIT } = require('../../config');
const { initInput } = require('../util/inputUtil');
const { createWS, mkdirs } = require('../util/fsUtil');
const { renderFileTpl } = require('../util/renderUtil');
let config = require('../../origin/config.default');
const {keys} = require('lodash');
const initCMD = () => {
    initInput(INIT, res => {
      const configFilePath = path.resolve(process.cwd(), res.name, 'config', 'config.default.js');
      const originPath = path.resolve(__dirname, '../../origin/config.default.js')
      renderFileTpl(originPath, res, result => {
        fs.createWriteStream(configFilePath); //创建文件
        fs.writeFile(configFilePath, result, 'utf8', () => { //写入文件
          // fsUtil.copyFolder(path.resolve(__dirname, '../../template'), path.resolve(process.cwd(), config.name, 'config'));
        });
      });
    });
}
const bulidCMD = () => {
  const configPath = path.resolve(process.cwd(), 'config', 'config.default.js');
  fs.stat(configPath, (err, stat) => {
    if (!stat) {
      console.log(`项目配置文件${path.basename(configPath)}未定义！`)
      return;
    }
    if (!stat.isFile()) {
      console.log('无效的配置文件');
      return;
    }
    const config = require(configPath);
    mkdirs(config.controllerDir, () => {}); // 生成 controller 目录
    mkdirs(config.serviceDir, () => {}); // 生成 service 目录 
    mkdirs(config.pluginDir, () => {}); // 生成 service 目录 
    mkdirs(config.middlewareDir, () => {}) //生成 中间件目录
    mkdirs(config.logDir, () => {}) //生成 log目录
    mkdirs('app/public', () => {}) //生成 public目录
  });
}
module.exports = {
  initCMD,
  bulidCMD
} 