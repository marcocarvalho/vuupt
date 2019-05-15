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
});