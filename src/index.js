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

VuuptApi.prototype.getInstance = function(){
    if(this.instance) { return this.instance; }

    this.instance = axios.create({
        baseURL: this.options.baseUrl,
        timeout: 2000,
        headers: { 'Authorization': 'api_key ' + this.options.apiKey }
    });

    return this.instance;
};

VuuptApi.prototype.status = function(){
    return (
        this
            .getInstance()
            .get('/')
            .then((result) => result.data)
            .catch(function(err) {
                return { success: false, message: err };
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