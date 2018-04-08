module.exports = {
  "global": [
     {
      "name": "middlewareA",
      "enable": true,  // 中间件启用与否
      "match": '*', // 符合正则的request 会流经该中间件  
      "options": {}
    }
  ],
  "local": []
}