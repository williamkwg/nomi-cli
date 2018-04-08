'use strict';
/**
 * @description 封装文件操作
 * @author weiguo.kong
 */
const fs   = require('fs')
const path = require('path')
/**
 * 创建读取流
 * @param {*} srcFile 
 * @param {*} cb 
 */
const createRS = async (srcFile, cb, options) => {
    const rs = await fs.createReadStream(srcFile, options);
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
const createWS = async (tarFile, cb, options) => {
    const ws = await fs.createWriteStream(tarFile, options);
    ws.on('error', err => {
        cb && cb(err);
    })
    ws.on('close', ex => {
        cb && cb(ex);
    });
    return ws;
}

/**
 * copy file: 将srcFile文件 copy 至 tarFile
 * @param {*} srcFile 
 * @param {*} tarFile 
 * @param {*} cb 
 */
const copyFile = async (srcFile, tarFile, cb) => {
    const rs = await createRS(srcFile, cb);
    const ws = await createWS(tarFile, cb);
    rs.pipe(ws);
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

module.exports = {
    copyFolder,
    copyFile
}