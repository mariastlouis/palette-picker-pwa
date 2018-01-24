const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + '/public')));

app.locals.title = 'Palette Picker';

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Welcome to Palette Picker');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/projects', (request, response) =>{
  database('projects').select()
  .then((projects) => {
    response.status(200).json({projects});
  })
  .catch((error) => {
    response.status(500).json({error})
  })
});

app.get('/api/v1/palettes', (request, response) =>{
  database('palettes').select()
  .then((palettes) => {
    response.status(200).json({palettes});
  })
  .catch((error) => {
    response.status(500).json({error})
  })
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['title']) {
    if(!project[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the required parameter ${requiredParameter}`
      })
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      return response.status(201).json({id: project[0]})
    })
    .catch(error => {
      return response.status(500).json({error});
    })
});
