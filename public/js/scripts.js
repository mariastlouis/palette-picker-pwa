
$(document).ready(() => {
  setColors();
});

const setColors = () => {
  reloadAnimation()
  const colorNumbers = [1, 2, 3, 4, 5];
  colorNumbers.forEach(number => {
    if(!$(`.color-box${number}`).hasClass('favorite')) {
    let color = generateColors();


    $(`.circle${number}`).css("background-color", color)
    $(`.color-box${number}`).css("background-color", color)
    $(`.hex-code${number}`).text(color.toUpperCase())
    $(`.hex-code${number}`).css("color", darkenColor)
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

const darkenColor = (color, amt) => {
  let usePound = false;
  if(color[0] == "#") {
    color = color.slice(1);
    usePound = true;
  }
  let num = parseInt(color, 16);
  
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
  let g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

// function LightenDarkenColor(col, amt) {
  
//     var usePound = false;
  
//     if (col[0] == "#") {
//         col = col.slice(1);
//         usePound = true;
//     }
 
//     var num = parseInt(col,16);
 
//     var r = (num >> 16) + amt;
 
//     if (r > 255) r = 255;
//     else if  (r < 0) r = 0;
 
//     var b = ((num >> 8) & 0x00FF) + amt;
 
//     if (b > 255) b = 255;
//     else if  (b < 0) b = 0;
 
//     var g = (num & 0x0000FF) + amt;
 
//     if (g > 255) g = 255;
//     else if (g < 0) g = 0;
 
//     return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
// }

const toggleFavorite = (event) => {
  $(event.target).toggleClass('lock-icon')
  $(event.target).parents('.color-box').toggleClass('favorite');
}


$('.generate-btn').on('click', setColors)
$('.unlock-icon').on('click', toggleFavorite)

