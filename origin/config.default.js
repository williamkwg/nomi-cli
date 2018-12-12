module.exports = {
  "name": "@name",
  "key": "@key",
  "description": "@description",
  "author": "@author",
  "version": "1.0.0",
  "port": "8080",
  "workers": 4,
  "multipart": {
    "fileExtensions": [ '.xlsx', '.xls' ]
  },
  "bodyParser": {
    "jsonLimit": "200", // 请求body 的最大长度  单位kb   number | string  eg: 200  or 200kb
    "formLimit": "1" // application/x-www-form-urlencoded 最大长度 单位 kb  number | string  eg: 200  or 200kb
  },
  "jsonp": {
    "callback": "callback" // 识别query中的`callback`参数
  },
  "security": { // 安全性
    "csrf": {
      "enable": false
    }
  },
  "controllerDir": ["app/controller"],
  "serviceDir": ["app/service"],
  "middlewareDir": "app/middleware",
  "pluginDir": "app/plugin"
};
