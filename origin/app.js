"use strict";
import { join } from 'path';
const config = require(join(process.cwd(), 'config', 'config.default'));
import Server from 'nomi-core';
new Server(config.default);