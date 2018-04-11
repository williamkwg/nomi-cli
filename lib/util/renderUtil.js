const { isObject, keys, isFunction } = require('lodash');
const path = require('path');
const fs = require('fs');

/**
 * 渲染模板数据
 * @param tpl : 模板   eg: @name is a doctor!
 * @param data : 替换数据 {name: 'weiguo.kong'}
 * @param tag : 替换符  eg: @ $ & ~  @#￥ 等特殊字符 以及其组合
 * @result weiguo.kong is a doctor!
 */
const renderTpl = (tpl, data, tag) => {
  tag = tag || '@';
  if (!isObject(data)) { // 如果不是对象， 不支持渲染
    return tpl;
  }
  keys(data).forEach(key => {
    tpl = tpl.replace(tag + key, data[key]);
  });
  return tpl;
};
/**
 * 渲染模板文件
 * @param {*} path 模板文件路径 
 * 其他参数 参考 renderTpl
 */
const renderFileTpl = (filePath, data, tag, cb) => {
  fs.stat(filePath, (err, stats) => {
    if (!stats) {
      console.log('找不到指定文件');
      return;
    }
    if (!stats.isFile()) {
      console.log(`找不到模板文件${path.basename(filePath)}`);
      return;
    }
    if (!tag || isFunction(tag)) {
      cb = tag;
    }
    fs.readFile(filePath, 'utf8', (err, tpl) => {
        const res = renderTpl(tpl, data, isFunction(tag) ? null : tag);
        cb && cb(res);
    });
  });
};

module.exports = {
  renderTpl,
  renderFileTpl
};