var path = require('path');
const Vuupt = require(path.resolve(__dirname, '../index'));
const MockAdapter = require('axios-mock-adapter');

var url = 'https://api.vuupt.com/api/v1/';

const axios = require('axios').create(
    //http://sandbox.vuupt.com/api/v1
    Vuupt.driverOptions({apiKey: 'fakeApi', baseUrl: url})
);

global.vuupt = new Vuupt({ baseUrl: 'https://api.vuupt.com/api/v1/'});
global.mock = new MockAdapter(axios);
axios.create = function(){ return axios; };
global.vuuptMocked = new Vuupt({ driver: axios });
global.chai = require('chai');
global.expect = chai.expect;