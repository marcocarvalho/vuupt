'strict mode';

describe("geocode - /utilities/map/geocode", function(){
    it("success", function(done){
        vuupt
            .geocode('Praça da Sé, 1, São Paulo, SP')
            .then(function(result){
                expect(result.success).to.eql(true);
                expect(Object.keys(result)).to.eql(['success', 'response']);
                expect(result.response.latitude).to.eql(-23.5493479);
                expect(result.response.longitude).to.eql(-46.6332098);
                done();
            }).catch(done);
    });

    it("404", function(done){
        mock.onGet('/').reply(404);
        vuupt
            .geocode('blabalalbablbala')
            .then(function(result){
                expect(result.status_code).to.eql(404);
                expect(result.success).to.eql(false);
                expect(Object.keys(result)).to.include('message');
                done();
            }).catch(done);
    });
});