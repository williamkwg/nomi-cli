module.exports = app => {
  return {
    "global": [], // 全局中间件：每一个 请求都会流经
    "local": [] // 业务中间件
  }
};