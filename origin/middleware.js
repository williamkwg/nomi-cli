module.exports = {
  "global": [ // 全局中间件：每一个 请求都会流经
     {
      "name": "middlewareA", //中间件名字
      "enable": true,  // 中间件启用与否
      "match": '*', // 符合正则的request 会流经该中间件  
      "options": {}
    }
  ],
  "local": [] // 业务中间件
};