global.rootRequire = name => require(`${__dirname}/src/${name}`);

require('dotenv-safe').config();
module.exports = require('./src/index.js');
