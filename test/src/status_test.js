'strict mode';

describe("status - /", function(){
    it("success", function(done){
        vuupt
            .status()
            .then(function(result){
                expect(result.success).to.eql(true);
                expect(Object.keys(result)).to.eql(['success', 'message', 'ip']);
                done();
            }).catch(done);
    });

    it("404", function(done){
        mock.onGet('/').reply(404);
        vuuptMocked
            .status()
            .then(function(result){
                expect(result.status_code).to.eql(404);
                expect(result.success).to.eql(false);
                expect(Object.keys(result)).to.include('message');
                done();
            }).catch(done);
    });
});