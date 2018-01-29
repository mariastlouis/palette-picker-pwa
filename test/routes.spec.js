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
  beforeEach((done) => {
    knex.seed.run()
    .then(() => done())
  });



describe('get /api/v1/projects', () => {
    it('should get from api/v1/projects', () => {
      return chai.request(server)
        .get('/api/v1/projects')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.projects[0].should.have.property('id');
          response.body.projects[0].should.have.property('title');
        })
        .catch(error => {
          throw error;
        })
    })
  });


describe('POST /api/v1/projects', () => {
  it('should build a new project', () => {
    return chai.request(server)
    .post('/api/v1/projects')
    .send({
      title: 'Mock Project'
    })
    .then(response => {
     
      response.should.have.status(201);
    })
    .catch(error => {
      throw error;
    })
  })

  it('should throw and error if the project has no title', () => {
    return chai.request(server)
    .post('/api/v1/projects')
    .send({
      whoseit: 'whatsit'
    })
    .then(response => {
      response.should.have.status(422)
    })
    .catch(error => {
      throw error;
    })
  })
});



describe('GET /api/v1/palettes', () => {
  it('should get from api/v1/palettes', () => {
    return chai.request(server)
    .get('/api/v1/palettes')
    .then(response => {
      response.should.have.status(200)
      response.body.palettes[0].should.have.property('id');
      response.body.palettes[0].should.have.property('title');
      response.body.palettes[0].should.have.property('project_id');
      response.body.palettes[0].should.have.property('color1');
      response.body.palettes[0].should.have.property('color2');
      response.body.palettes[0].should.have.property('color3');
      response.body.palettes[0].should.have.property('color4');
      response.body.palettes[0].should.have.property('color5');
    })
    .catch(error => {
      throw error;
    })
  })

});

describe('POST /api/v1/projects/:projectid/palettes', () => {
  it('should post a palette', () => {
    return chai.request(server)
    .post('/api/v1/projects/20/palettes')
    .send({
      title: 'newpalette',
      color1: '#6E8EB1',
      color2: '#59F515',
      color3: '#2ECCE6',
      color4: '#74B54A',
      color5: '#5F3627',
      project_id: 20
    })
    .then(response => {
      response.should.have.status(201);
      response.body.should.be.a('object');
    })
    .catch(error => {
      throw error;
    })
  })
   
   it('should throw an error if required parameter is missing', () => {
    return chai.request(server)
    .post('/api/v1/projects/20/palettes')
    .send({
      title: 'anotherPalette',
      color1: '#6E8EB1',
      color2: '#59F515',
      color3: '#2ECCE6',
      color4: '#74B54A',
    })
    .then(response => {
      response.should.have.status(422);
    })
    .catch(error => {
      throw error;
    })
  })


})

describe('get /api/v1/projects/:id', () => {
    it('should get a specific project', () => {
      return chai.request(server)
        .get('/api/v1/projects/23')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.projects[0].should.have.property('id');
          response.body.projects[0].should.have.property('title');
        })
        .catch(error => {
          throw error;
        })
    })
  });
  
  it('should throw an error if id is not found', () => {
    return chai.request(server)
    .get('/api/v1/projects/780')
    .then(response => {
      response.should.have.status(404)
    })
  })
  

});
