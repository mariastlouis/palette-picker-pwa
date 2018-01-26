
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
  .then(() => knex ('projects').del())
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('projects').insert({
          title: 'Cows'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            {title: 'black', project_id: project[0], color1: '#205E10', color2: '#DD2EE7', color3: '#3CA5EC', color4: '#ECC8F', color5: '#7DC6CA'},
            {title: 'blue', project_id: project[0], color1: '#C04112', color2: '#A8D33A', color3: '#44913E', color4: '#EDEB3D', color5: '#F0377C'}
          ])
        })
        .then(() => console.log('Seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    });
};
