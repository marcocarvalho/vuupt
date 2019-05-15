'use strict';

const axios = require('axios');

const defaultOptions = {
    baseUrl: 'https://api.vuupt.com/api/v1/',
    apiKey: process.env.VUUPT_API_KEY
};

function VuuptApi(opts){
    this.options = Object.assign({}, defaultOptions, opts || {});
    if(!this.options.apiKey){
        throw new Error("apiKey not set. You can pass it to constructor or set VUUPT_API_KEY env var");
    }
}

function driverOptions(opts){
    opts = Object.assign({}, opts || {});

    return Object.assign({}, {
        baseURL: opts.baseUrl,
        timeout: 2000,
        headers: { 'Authorization': 'api_key ' + opts.apiKey }
    });
};
VuuptApi.driverOptions = driverOptions;
VuuptApi.defaultOptions = defaultOptions;


VuuptApi.prototype.getInstance = function(){
    if(this.instance) { return this.instance; }

    var driver = this.options.driver || axios;

    this.instance = driver.create(
        driverOptions({ apiKey: this.options.apiKey, baseUrl: this.options.baseUrl })
    );

    return this.instance;
};

VuuptApi.prototype.status = function(){
    return (
        this
            .getInstance()
            .get('/')
            .then((result) => result.data)
            .catch(function(err) {
                return { success: false, message: err, status_code: err.response.status };
            })
    );
};

VuuptApi.prototype.geocode = function(address){
    return (
        this
            .getInstance()
            .get('/utilities/map/geocode', { params: { address: address }})
            .then((result) => result.data)
            .catch((err) => err.response.data)
    );
};

module.exports = VuuptApi;