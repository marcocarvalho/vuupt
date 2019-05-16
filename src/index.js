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
        timeout: 30000,
        headers: {
            'Authorization': 'api_key ' + opts.apiKey,
            'Content-Type': 'application/json'
        }
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

function successDealer(result){
    // console.log("\n\n\n\n\n\n\n\n\n\n--------------------------------------");
    // console.log('successDealer');
    // console.log(result);
    return {
        success: true,
        response: result.data
    };
}

function errorDealer(err){
    // console.log("\n\n\n\n\n\n\n\n\n\n--------------------------------------");
    // console.log('errorDealer');
    // console.log(err);
    return Object.assign({success: false}, err.response.data);
}

VuuptApi.prototype.status = function(){
    return (
        this
            .getInstance()
            .get('/')
            .then((result) => result.data)
            .catch(errorDealer)
    );
};

VuuptApi.prototype.geocode = function(address){
    return (
        this
            .getInstance()
            .get('/utilities/map/geocode', { params: { address: address }})
            .then(successDealer)
            .catch(errorDealer)
    );
};

VuuptApi.prototype.newCustomer = function(client){
    return this
        .getInstance()
        .post('/customers', client)
        .then(successDealer)
        .catch(errorDealer);
};


VuuptApi.prototype.getCustomer = function(id){
    return this
        .getInstance()
        .get('/customers/'+id)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.updateCustomer = function(client){
    return this
        .getInstance()
        .put('/customers/'+client.id, client)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.removeCustomer = function(id){
    return this
        .getInstance()
        .delete('/customers/'+id)
        .then(successDealer)
        .catch(errorDealer);
};

module.exports = VuuptApi;