'use strict'
module.exports = {
  initInput: (init, func) => {
      const i = 1;
      const inputArr = [];
      const len = init.length;
      process.stdout.write(init[0].description);
      process.stdin.setEncoding('utf-8');
      process.stdin.on('data', (chunk) => {
        chunk = chunk.replace(/[\s\n]/, '');
        const inputJson = {
          value: chunk
        };
        inputArr.push(inputJson);
        if ((len--) > 1) {
          process.stdout.write(init[i++].desc)
        } else {
          process.stdin.pause();
          func(inputArr);
        }
      });
    }
}