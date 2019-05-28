const { isNode } = require('browser-or-node');

if(isNode) require('dotenv-safe').config();
module.exports = require('./src/index.js');
