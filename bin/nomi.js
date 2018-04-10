#!/usr/bin/env node
'use strict';
const cli = require('../lib/cli');
const cmd = process.argv[2]; // nomi cmd
cli.run(cmd); // cli 入口文件
