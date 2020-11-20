let chai = require("chai");
let chaiHttp = require("chai-http");
var should = require("chai").should();

chai.use(chaiHttp);

describe("/GET articles", () => {
  it("it should GET all the articles", (done) => {
    chai
      .request("localhost:8080")
      .get("/api/v1/articles")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});


describe('/POST article', () => {
    it('it should not POST a article without pages field', (done) => {
      
      chai.request("localhost:8080")
          .post('/api/v1/articles')
          .send({
            "nickname":"test1",
            "title":"test1"
        })
          .end((err, res) => {    
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
            done();
          });
    });
    it('it should POST a article ', (done) => {
      
      chai.request("localhost:8080")
          .post('/api/v1/articles')
          .send({
            "nickname":"test1",
            "title":"test1",
            "content":"test1"
        })
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.result.should.have.property('nickname');
                res.body.result.should.have.property('title');
                res.body.result.should.have.property('content');
            done();
          });
    });
});



