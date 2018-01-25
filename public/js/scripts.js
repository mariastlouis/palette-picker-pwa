
$(document).ready(() => {
  setColors();
  getPalettes();
  getProjects();
});

let projects =[];
let palettes = [];


const setColors = () => {
  reloadAnimation();
  const colorNumbers = [1, 2, 3, 4, 5];
  colorNumbers.forEach(number => {
    if(!$(`.color-box${number}`).hasClass('favorite')) {
    let color = generateColors();


    $(`.circle${number}`).css("background-color", color)
    $(`.color-box${number}`).css("background-color", color)
    $(`.hex-code${number}`).text(color.toUpperCase())
  }
  });
}

const reloadAnimation = () => {
  const donut = $('.donut-chart-article')
  const newDonut = donut.clone(true);
  donut.before(newDonut);
  $("." + donut.attr("class") + ":last").remove();
}


const generateColors = () => {
const color = '#'+Math.floor(Math.random()*16777215).toString(16);
return color;
}



const toggleFavorite = (event) => {
  $(event.target).toggleClass('lock-icon')
  $(event.target).parents('.color-box').toggleClass('favorite');
}


const getPalettes = async() => {
  const paletteFetch = await fetch('/api/v1/palettes');
  const paletteObject = await paletteFetch.json();
  palettes = paletteObject.palettes
  appendPalettes()
}

const getProjects = async () => {
  const projectFetch = await fetch ('/api/v1/projects');
  const projectObject = await projectFetch.json();
  projects = projectObject.projects
  appendProjects()
}

const appendPalettes = () => {
  console.log(palettes)
}

const appendProjects = () => {
  const projectCards = projects.map(project => 
   `<article class = "project-article id-${project.id}">
    <h3 class = "project-name"> ${project.title} </h3>
   </article>`
  );

  $('.project-container').html(projectCards)
}

const postProject = async () => {
  let newProjectTitle = $('.project-input')
  let newProjectName = newProjectTitle.val();
  const savedProject = await fetch('/api/v1/projects', {
    method: 'POST',
    headers: {
      'CONTENT-TYPE': 'application/json'
    },
    body: JSON.stringify({title: newProjectName})
  })
  const idNewProject = await savedProject.json();
  console.log(idNewProject)
  newProjectTitle.val('')

}

$('.save-project-btn').on('click', postProject)
$('.generate-btn').on('click', setColors)
$('.unlock-icon').on('click', toggleFavorite)

