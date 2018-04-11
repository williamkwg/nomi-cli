'use strict';
/**
 * @description 封装文件操作
 * @author weiguo.kong
 */
const fs   = require('fs');
const path = require('path');
const { isArray, isString } = require('lodash');

/**
 * 校验文件路径 是否有效
 * @param {*} vPath 
 * @param {*} cb 
 */
const validateFile = (vPath, cb) => {
    fs.stat(vPath, (err, stat) => {
        if (!stat) {
            console.log(`文件${path.basename(vPath)}未定义！`);
            return;
        }
        if (!stat.isFile()) {
            console.log(`${path.basename(vPath)} 不是一个文件！`);
            return;
        }
        cb && cb(err, stat);
    });
}


/**
 * 创建读取流
 * @param {*} srcFile 
 * @param {*} cb 
 */
const createRS = (srcFile, cb, options) => {
    const rs = fs.createReadStream(srcFile, options);
    rs.on('error', err => {
        cb && cb(err);
    });
    return rs;
}
/**
 * 创建写入流
 * @param {*} tarFile 
 * @param {*} cb 
 */
const createWS = (tarFile, cb, options) => {
    const ws = fs.createWriteStream(tarFile, options);
    ws.on('error', err => {
        cb && cb(err);
    })
    ws.on('close', ex => {
        cb && cb(ex);
    });
    ws.on('open', ex => {
        cb && cb(ex);
    }) 
    return ws;
}

/**
 * copy file: 将srcFile文件 copy 至 tarFile
 * @param {*} srcFile 
 * @param {*} tarFile 
 * @param {*} cb 
 */
const copyFile = (srcFile, tarFile, cb) => {
    const rs = createRS(srcFile, cb);
    const ws = createWS(tarFile, cb);
    rs.pipe(ws);
}

/**
 * 递归创建目录: 异步
 * @param {string | Array} dirname  eg： 'foo/dre/cof/fd/' ['foo/fdf', 'ffa/fds']
 * @param {fun} callback 
 */
const mkdirs = (dirname, callback) => {
    if (isString(dirname)) {
        dirname = [dirname];
    }
    if (!isArray(dirname)) {
        return;
    }
    dirname.forEach(dir => {
        fs.exists(dir, exists => {
            if (exists) { 
                callback && callback();  
            } else {  
                mkdirs(path.dirname(dir),  () => {  
                    fs.mkdir(dir, callback);
                });  
            }
        });
    });
} 

/**
 * 同步： 递归创建目录
 * @param {*} dirname 
 */
const mkdirsSync = dirname => {  
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}


/**
 * copy 目录下所有子目录 以及文件
 * @param {*} srcDir 
 * @param {*} tarDir 
 * @param {*} cb 
 */
const copyFolder = (srcDir, tarDir, cb) => {
    fs.readdir(srcDir, (err, files) => {
        let count = 0;
        const checkEnd = () => {
            ++count == files.length && cb && cb();
        }
        if (err) {
            checkEnd();
            return
        }
        files.forEach(file => {
            let srcFile = path.join(srcDir, file);
            let tarFile = path.join(tarDir, file);
            fs.stat(srcFile, (err, stats) => {
                if (stats.isDirectory()) {
                    fs.mkdir(tarFile, err => {
                            if (err) {
                                return;
                            }
                            copyFolder(srcFile, tarFile, checkEnd); //递归copy目录
                        });
                } else if(stats.isFile()) {
                    copyFile(srcFile, tarFile, checkEnd); // copy文件
                }
            });
        });
        files.length === 0 && cb && cb();
    });
};

/**
 * 根据path 创建文件，并复制data内容写入文件
 * @param {*} path 
 * @param {*} data 
 * @param {*} cb 
 */
const writeFile = (path, data, cb) => {
    //fs.createWriteStream(path); //根据路径创建文件
    createWS(path, () => {
        fs.stat(path, (err, stats) => {
            if (!stats) {
                console.log(`文件路径错误，文件写入失败！`)
                return;
            }
            if (stats.isFile()) {
                console.log(path, data)
                fs.writeFile(path, data, 'utf8', () => { //写入数据
                    cb && cb();
                });
            }
        });
    });
};



const readFile = (filePath, cb, options) => {
    validateFile(filePath, () => {
        options = options || 'utf8';
        fs.readFile(filePath, options, (err, data) => {cb && cb(data)});
    });
}

module.exports = {
    copyFolder,
    copyFile,
    createRS,
    createWS,
    mkdirs,
    mkdirsSync,
    writeFile,
    validateFile,
    readFile
}