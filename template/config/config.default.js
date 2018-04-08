module.exports = {
  "name": "",
  "key": "",
  "description": "",
  "author": "",
  "version": "",
  "prot": "8080",
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
    },
  },
  "db": {
    "common": {},
    "client": {
        "name": "",
        "type": "mysql",
        "host": "10.86.48.32",
        "port": "3306",
        "user": "",
        "password": "",
        "database": "",
        "app": true,
        "connectionLimit": 4 
    }
  },
  "controllerDir": "app/controller",
  "logDir": "logs",
  "serviceDir": "app/service",
  "middlewareDir": "app/middleware",
  "pluginDir": "app/plugin"
};
