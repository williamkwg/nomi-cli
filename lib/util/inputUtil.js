module.exports = {
  initInput: (init, func) => {
      const i = 1;
      const inputArr = [];
      const len = init.length;
      process.stdout.write(init[0].description);
      process.stdin.resume();
      process.stdin.setEncoding('utf-8');
      process.stdin.on('data', (chunk) => {
        chunk = chunk.replace(/[\s\n]/, '');
        if (chunk !== 'y' && chunk !== 'Y' && chunk !== 'n' && chunk !== 'N') {
          console.log(config.colors.red('您输入的命令是： ' + chunk));
          console.warn(config.colors.red('请输入正确指令：y/n'));
          process.exit();
        }
        if (
          (init[i - 1].title === 'modifyConfirm' || init[i - 1].title === 'initConfirm') &&
          (chunk === 'n' || chunk === 'N')
        ) {
          process.exit();
        }
        const inputJson = {
          title: init[i - 1].title,
          value: chunk,
        };
        inputArr.push(inputJson);
        if ((len--) > 1) {
          process.stdout.write(init[i++].description)
        } else {
          process.stdin.pause();
          func(inputArr);
        }
      });
    }
}