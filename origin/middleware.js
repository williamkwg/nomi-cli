module.exports = {
  "global": [ // 全局中间件：每一个 请求都会流经
     {
      "name": "middlewareA", //中间件名字
      "package": "", //指定node_modules中的某个包，无此项则从config配置的指定的中间件目录中获取
      "enable": true,  // 中间件启用与否
      "match": '*', // 符合正则的request 会流经该中间件  
      "arguments": [] // 中间件 constructor的参数
    }
  ],
  "local": [] // 业务中间件
};