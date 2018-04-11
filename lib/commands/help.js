const { version } = require('../../package.json');
const versionCMD = () => {
  process.stdout.write(`v${version}`);
}
const helpCMD = () => {
  console.log('***----------------nomi-------------------***');
  console.log('nomi -h  nomi --help        // 查看nomi命令');
  console.log('nomi -v  nomi --version     // 打印nomi版本信息')
  console.log('nomi init                   // 初始化nomi 工程')
  console.log('nomi bulid                  // 构建nomi工程')
  console.log('***---------------------------------------***');
}
module.exports = {
  helpCMD,
  versionCMD
}