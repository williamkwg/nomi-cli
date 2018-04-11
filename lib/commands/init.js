const path = require('path');
const fs = require('fs');
const fsUtil = require('../util/fsUtil');
const { INIT } = require('../../config');
const { initInput } = require('../util/inputUtil');
const { createWS, mkdirs, writeFile, validateFile, readFile } = require('../util/fsUtil');
const { renderFileTpl } = require('../util/renderUtil');
let config = require('../../origin/config.default');
const {keys} = require('lodash');
const initCMD = () => {
    initInput(INIT, res => {
      const configFilePath = path.resolve(process.cwd(), res.name, 'config', 'config.default.js');
      const logFilePath = path.resolve(process.cwd(), res.name, 'config', 'log.js');
      const mwFilePath = path.resolve(process.cwd(), res.name, 'config', 'middleware.js');
      const pluginFilePath = path.resolve(process.cwd(), res.name, 'config', 'plugin.js');
      const sqlFilePath = path.resolve(process.cwd(), res.name, 'config', 'sql.sql');
      const configSrcPath = path.resolve(__dirname, '../../origin/config.default.js');
      const logSrcPath = path.resolve(__dirname, '../../origin/log.js');
      const mwSrcPath = path.resolve(__dirname, '../../origin/middleware.js');
      renderFileTpl(configSrcPath, res, result => { //渲染模板
        writeFile(configFilePath, result); // 创建目标文件 并 写入数据
        writeFile(sqlFilePath, "");
        writeFile(pluginFilePath, "");
        readFile(logSrcPath, data => { writeFile(logFilePath, data) });
        readFile(mwSrcPath, data => { writeFile(mwFilePath, data) });
      });
    });
}
const bulidCMD = () => {
  const configPath = path.resolve(process.cwd(), 'config', 'config.default.js');
  validateFile(configPath, () => {
    const config = require(configPath);
    mkdirs(config.controllerDir, () => {}); // 生成 controller 目录
    mkdirs(config.serviceDir, () => {}); // 生成 service 目录 
    mkdirs(config.pluginDir, () => {}); // 生成 service 目录 
    mkdirs(config.middlewareDir, () => {}); //生成 中间件目录
    mkdirs('app/public', () => {}); //生成 public目录
    //mkdirs(config.logDir, () => {}); //生成 log目录 nomi server 在生成log文件
  });
}
module.exports = {
  initCMD,
  bulidCMD
} 