'use strict';

const axios = require('axios');
const path = require('path');

const defaultOptions = {
    baseUrl: process.env.VUUPT_API_URL || 'https://api.vuupt.com/api/v1/',
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


VuuptApi.prototype.vuuptRouteLinkUrl = function(id){
    if(this.options.baseURL.indexOf('sandbox') === -1){
        return `http://sandbox.vuupt.com/manager/routes/${id}`;
    } else {
        return `https://app.vuupt.com/manager/routes/${id}`;
    }
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


// Services

VuuptApi.prototype.newService = function(service){
    return this
        .getInstance()
        .post('/services', service)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.getService = function(id){
    return this
        .getInstance()
        .get('/services/'+id)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.assignService = function(serviceId, agentId){
    return this
        .getInstance()
        .put('/services/' + serviceId + '/assign-agent/' + agentId)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.unassignService = function(serviceId){
    return this
        .getInstance()
        .put('/services/' + serviceId + '/unassign-agent')
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.updateService = function(service){
    return this
        .getInstance()
        .put('/services/'+service.id, service)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.removeService = function(id){
    return this
        .getInstance()
        .delete('/services/'+id)
        .then(successDealer)
        .catch(errorDealer);
};

// Agents

VuuptApi.prototype.getAgents = function(opts){
    var params = {};
    if(opts) params.params = opts;
    return this
        .getInstance()
        .get('/agents', params)
        .then(successDealer)
        .catch(errorDealer);
};


// vehicles

VuuptApi.prototype.newVehicle = function(vehicle){
    return this
        .getInstance()
        .post('/vehicles', vehicle)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.getVehicles = function(opts){
    var params = {};
    if(opts) params.params = opts;
    return this
        .getInstance()
        .get('/vehicles', params)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.getVehicle = function(id){
    return this
        .getInstance()
        .get('/vehicles/'+id)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.updateVehicle = function(service){
    return this
        .getInstance()
        .put('/vehicles/'+service.id, service)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.removeVehicle = function(id){
    return this
        .getInstance()
        .delete('/vehicles/'+id)
        .then(successDealer)
        .catch(errorDealer);
};


// route-optimization

VuuptApi.prototype.newRoute = function(route){
    return this
        .getInstance()
        .post('/route-optimization', route)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.saveRoute = function(routeDescriptor) {
    return this
        .getInstance()
        .post('/routes', routeDescriptor)
        .then(successDealer)
        .catch(errorDealer);
};

VuuptApi.prototype.getRoute = function(id){
    return this
        .getInstance()
        .get('/route-optimization/'+id)
        .then(successDealer)
        .catch(errorDealer);
};

module.exports = VuuptApi;