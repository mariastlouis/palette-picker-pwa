
$(document).ready(() => {
  setColors();
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


const getPalettes = async(projectId, projectTitle) => {
  const paletteFetch = await fetch(`/api/v1/projects/${projectId}/palettes`);
  const paletteObject = await paletteFetch.json();
  const palette = paletteObject.palettes
  palettes.push(...palette)
  appendPalette(projectTitle, palette)

}

const getProjects = async () => {
  const projectFetch = await fetch ('/api/v1/projects');
  const projectObject = await projectFetch.json();
  projects = projectObject.projects
  appendSelect()

  projects.forEach(project => {
    getPalettes(project.id, project.title)
  })
}


const getSpecificProject = async (projectId) => {
const projectFetch = await fetch (`/api/v1/projects/${projectId}`);
const projectObject = await projectFetch.json();
const selectedProject = projectObject.projects;
const projectTitle = selectedProject[0].title;
appendPalette(projectTitle, selectedProject)
}

const appendPalette= (projectTitle, project) => {
 $('.project-container').append(`<h3> ${projectTitle} </h3>`)

 const setPalette = palettes.forEach(palette => {
  return $('.project-container').append (`
    <div class = "save-palette">
      <p> ${palette.title} </p>
    </div>
    `)
 })
 return setPalette
}

const appendProjects = (project) => {


}

// const appendProjects = () => {
//   const projectCards = projects.map(project => 
//    `<article class = "project-article project-${project.id}">
//     <h3 class = "project-name"> ${project.title} </h3>
//     <div class = "palette-section-${project.id}">
//     </div>
//    </article>`
//   );
//   $('.blank-project').html(projectCards)
// }


const appendSelect = () => {
  const projectSelect = projects.map(project => 
    `<option class = "color-value" value = ${project.id}> ${project.title} </option>`
  );
  $('.color-select').html(projectSelect)
}




const postProject = async () => {
  const newProjectTitle = $('.project-input')
  const newProjectName = newProjectTitle.val();
  const savedProject = await fetch('/api/v1/projects', {
    method: 'POST',
    headers: {
      'CONTENT-TYPE': 'application/json'
    },
    body: JSON.stringify({title: newProjectName})
  })
  const idNewProject = await savedProject.json();
  const newProject = Object.assign({}, {title: newProjectName}, {id:idNewProject});
  projects.push(newProject)
  appendProjects(newProject);
  appendSelect()

  newProjectTitle.val('')

}

const grabPalette = () => {
  const projectId = $('#project-select').val()
  console.log($('#project-select').text())
  const paletteTitle = $('.palette-input').val()
  const color_1 = $('.hex-code1').text();
  const color_2 = $('.hex-code2').text();
  const color_3 = $('.hex-code3').text();
  const color_4 = $('.hex-code4').text();
  const color_5 = $('.hex-code5').text();
  $('.palette-input').val('')

  const paletteBody = {
    title: paletteTitle,
    color1: color_1,
    color2: color_2,
    color3: color_3,
    color4: color_4,
    color5: color_5
  }

  postPalette(projectId, paletteBody)
  const getProject = getSpecificProject(projectId)
}

const postPalette = async (projectId, palette) => {
 const savedPalette = await fetch(`/api/v1/projects/${projectId}/palettes`, {
    method: 'POST',
    headers: {
      'CONTENT-TYPE': 'application/json'
    },
    body: JSON.stringify(palette)
  })

  const idNewPalette = await savedPalette.json();
  console.log(idNewPalette)
  const paletteTitle = $('.palette-input').val()
  console.log(projectId)
  const newPalette = Object.assign({}, idNewPalette, {project_id: projectId}, palette )
  palettes.push(newPalette)
  console.log(palettes)

}


$('.save-palette-btn').on('click', grabPalette)
$('.save-project-btn').on('click', postProject)
$('.generate-btn').on('click', setColors)
$('.unlock-icon').on('click', toggleFavorite)

