'strict mode';

describe("customer - /customer", function(){
    it("POST", function(done){
        vuupt
            .newCustomer({ name: 'Marco Carvalho', address: 'Rua José Cipriano de Freitas, 81 - Ibiuna - SP', latitude: -23.6583147, longitude: -47.2178799 })
            .then(function(result){
                expect(result.success).to.eql(true);
                expect(Object.keys(result)).to.eql(['success', 'response']);
                expect(typeof(result.response.customer.id)).not.to.eql('undefined');
                return vuupt
                    .removeCustomer(result.response.customer.id)
                    .then(() => done());
            }).catch(done);
    });

    it("get", function(done){
        vuupt
            .newCustomer({ name: 'Marco Carvalho', address: 'Rua José Cipriano de Freitas, 81 - Ibiuna - SP', latitude: -23.6583147, longitude: -47.2178799 })
            .then(function(result){
                expect(result.success).to.eql(true);
                expect(Object.keys(result)).to.eql(['success', 'response']);
                expect(typeof(result.response.customer.id)).not.to.eql('undefined');
                return vuupt
                    .getCustomer(result.response.customer.id);
            }).then(function(result){

                expect(result.response.customer.name).to.eql('Marco Carvalho');
                expect(result.response.customer.address).to.eql('Rua José Cipriano de Freitas, 81 - Ibiuna - SP');

                return vuupt.removeCustomer(result.response.id).then(() => done());
            }).catch(done);
    });

    it("update", function(done){
        vuupt
            .newCustomer({ name: 'Marco Carvalho', address: 'Rua José Cipriano de Freitas, 81 - Ibiuna - SP', latitude: -23.6583147, longitude: -47.2178799 })
            .then(function(result){
                expect(result.success).to.eql(true);
                expect(Object.keys(result)).to.eql(['success', 'response']);
                expect(typeof(result.response.customer.id)).not.to.eql('undefined');
                return vuupt
                    .updateCustomer({id: result.response.customer.id, name: 'Marco Aurelio Carvalho'});
            }).then(function(result){

                expect(result.response.customer.name).to.eql('Marco Aurelio Carvalho');

                return vuupt.removeCustomer(result.response.id).then(() => done());
            }).catch(done);
    });

});