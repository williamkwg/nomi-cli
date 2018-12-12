const { version } = require('../../package.json');
const versionCMD = () => {
  process.stdout.write(`v${version}`);
}
const helpCMD = () => {
  console.log('***----------------nomi-------------------***');
  console.log('nomi-cli -h  nomi-cli --help        // 查看nomi命令');
  console.log('nomi-cli -v  nomi-cli --version     // 打印nomi版本信息')
  console.log('nomi-cli init                   // 初始化nomi 工程')
  console.log('nomi-cli bulid                  // 构建nomi工程')
  console.log('***---------------------------------------***');
}
module.exports = {
  helpCMD,
  versionCMD
}