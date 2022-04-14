const { request } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Recipes API Service', function () {
  it('should GET all recipes', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/api/recipe')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });


  it('Should be logged in to create a recipe', function(done) {
      const newRecipe = {
        name: "Vanilla Cream Ale",
        author:"admin@admin.com",
        grains: [
            "American Pale 2-Row",
        ],
        hops: [
            "Cascade (60m Boil)",
        ],
        yeast: "Wyeast - Kölsch 2565",
        process: "Mash at 150F for 75mins, bring to boil for 60. Produces 5 Gallons"
        };
    const expected = {
        auth: false,
        msg: "Access Denied"
    }

    chai
      .request('http://localhost:3000')
      .post('/api/recipe')
      .send(newRecipe)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(401);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it('should POST a single recipe', function (done) {
    const newRecipe = {
        name: "Vanilla Cream Ale",
        author:"admin@admin.com",
        grains: [
            "American Pale 2-Row",
        ],
        hops: [
            "Cascade (60m Boil)",
        ],
        yeast: "Wyeast - Kölsch 2565",
        process: "Mash at 150F for 75mins, bring to boil for 60. Produces 5 Gallons"
        };

    chai
      .request('http://localhost:3000')
      .post('/api/recipe')
      .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTcwMzY2NTk5MTRlZjVjOGJhNDEwMSIsImlhdCI6MTY0OTk1NTI4OX0.V4b1yFrNqKw-WXDOqthl85W-zJa6U6-p8tvPlLRC3sg')
      .send(newRecipe)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.have.property('_id')
        done();
      });
  });
});