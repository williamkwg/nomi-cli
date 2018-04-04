#!/usr/bin/env node
'use strict';
const cli = require('../lib/cli'),
    cmd = process.argv[2];

cli.run(cmd);
