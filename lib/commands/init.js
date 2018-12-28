const path = require('path');
const { INIT } = require('../../config');
const { initInput } = require('../util/inputUtil');
const { mkdirs, writeFile, validateFile, readFile } = require('../util/fsUtil');
const { renderFileTpl } = require('../util/renderUtil');
const initCMD = () => {
    initInput(INIT, res => {
      const tarBasePath = path.resolve(process.cwd(), res.name, 'config'),
            configFilePath = path.resolve(tarBasePath, 'config.default.js'),
            packageFilePath = path.resolve(process.cwd(), res.name, 'package.json'),
            appFilePath = path.resolve(process.cwd(), res.name, 'index.js'),
            babelFilePath = path.resolve(process.cwd(), res.name, 'babel.config.js'),
            mwFilePath = path.resolve(tarBasePath, 'middleware.js'),
            pluginFilePath = path.resolve(tarBasePath, 'plugin.js'),
            sqlFilePath = path.resolve(tarBasePath, 'sql.sql'),
            configSrcPath = path.resolve(__dirname, '../../origin/config.default.js'),
            packageSrcPath = path.resolve(__dirname, '../../origin/package.json'),
            appSrcPath = path.resolve(__dirname, '../../origin/index.js'),
            babelSrcPath = path.resolve(__dirname, '../../origin/babel.config.js'),
            mwSrcPath = path.resolve(__dirname, '../../origin/middleware.js');
      renderFileTpl(configSrcPath, res, result => { //渲染模板
        writeFile(configFilePath, result, () => { 
          bulidCMD(path.resolve(process.cwd(), res.name));
        }); // 创建目标文件 并 写入数据 并构建基本应用目录
        writeFile(sqlFilePath, "");
        writeFile(pluginFilePath, "");
        readFile(mwSrcPath, data => { writeFile(mwFilePath, data) });
        readFile(appSrcPath, data => { writeFile(appFilePath, data) });
        readFile(babelSrcPath, data => { writeFile(babelFilePath, data) });
      });
      renderFileTpl(packageSrcPath, res, result => {
        writeFile(packageFilePath, result, () => {});
      });
    });
}
const bulidCMD = projectPath => {
  const prefix = projectPath ? path.basename(projectPath) : '';
  projectPath = projectPath || process.cwd();
  const configPath = path.resolve(projectPath, 'config', 'config.default.js');
  validateFile(configPath, () => {
    const config = require(configPath);
    mkdirs(config.controllerDir, () => {}, prefix); // 生成 controller 目录
    mkdirs(config.serviceDir, () => {}, prefix); // 生成 service 目录 
    mkdirs(config.pluginDir, () => {}, prefix); // 生成 service 目录 
    mkdirs(config.middlewareDir, () => {}, prefix); //生成 中间件目录
    mkdirs('app/public', () => {}, prefix); //生成 public目录
    //mkdirs(config.logDir, () => {}); //生成 log目录 nomi server 在生成log文件
  });
}
module.exports = {
  initCMD,
  bulidCMD
} 