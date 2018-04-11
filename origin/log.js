module.exports = {
  "appLog": {
    "name": "app.log",
    "level": 'info', // none all info warn error debug 5个级别
    "upload": "", // 上传日志至远程服务器： 函数书写具体上传、打印逻辑  或者 直接配置 远程url ，定时将日志内容同步
    "split": {
      "method": "time", // 日志切分方式  size(按文件体积) time(按时间)  size:fileName: ${name}.${size}.timestamp.log  time:${name}.2018-01-19~17:51:44.log
      "threshold": 24 * 60 * 60 * 1000 //切分文件的阈值，超过该阈值自动切分文件  [size: kb  time: ms]
    },
    "backups": 7,  // 当指定目录下该日志文件数超过 该值，旧的文件将被删除 系统默认 -1 不删除任何文件
    "layout": function(request) {
    }
  },
  "errorLog": {
    "name": "error.log",
    "level": 'info', // none all info warn error debug 5个级别
    "upload": "", // 上传日志至远程服务器： 函数书写具体上传、打印逻辑  或者 直接配置 远程url ，定时将日志内容同步
    "split": {
      "method": "time", // 日志切分方式  size(按文件体积) time(按时间)  size:fileName: ${name}.${size}.timestamp.log  time:${name}.2018-01-19~17:51:44.log
      "threshold": 24 * 60 * 60 * 1000 //切分文件的阈值，超过该阈值自动切分文件  [size: kb  time: ms]
    },
    "backups": 7,  // 当指定目录下该日志文件数超过 该值，旧的文件将被删除 系统默认 -1 不删除任何文件
    "layout": function(request) {
    }
  },
  "coreLog": {
    "name": "framework.log",
    "level": 'info', // none all info warn error debug 5个级别
    "upload": "", // 上传日志至远程服务器： 函数书写具体上传、打印逻辑  或者 直接配置 远程url ，定时将日志内容同步
    "split": {
      "method": "time", // 日志切分方式  size(按文件体积) time(按时间)  size:fileName: ${name}.${size}.timestamp.log  time:${name}.2018-01-19~17:51:44.log
      "threshold": 24 * 60 * 60 * 1000 //切分文件的阈值，超过该阈值自动切分文件  [size: kb  time: ms]
    },
    "backups": 7,  // 当指定目录下该日志文件数超过 该值，旧的文件将被删除 系统默认 -1 不删除任何文件
    "layout": function(request) {
    }
  }
}