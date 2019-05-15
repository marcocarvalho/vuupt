var path = require('path');
const Vuupt = require(path.resolve(__dirname, '../index'));

global.vuupt = new Vuupt();
global.chai = require('chai');
global.expect = chai.expect;