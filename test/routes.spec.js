process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');


chai.use(chaiHttp);

describe('Client Routes', () => {
   it('Should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(error => {
      throw error;
    });
  });

  it('Should return a 404 for a route that does not exist', () => {
    return chai.request(server)
      .get('/noRoute')
      .then(response => {
        response.should.have.status(404);
  })
    .catch(error => {
        throw error;
      });
  });
});

describe('API Routes', () => {
   beforeEach( (done) => {
    knex.seed.run()
      .then(() => {
        done();
      });
  });

describe('get /api/v1/projects', () => {
    it('should get from api/v1/projects', () => {
      return chai.request(server)
        .get('/api/v1/projects')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.projects.length.should.equal(1);
          response.body.projects[0].should.have.property('id');
          response.body.projects[0].should.have.property('title');
        })
        .catch(error => {
          throw error;
        });
    });
  });

  
});
