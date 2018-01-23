
$(document).ready(() => {
  setColors();
});

const setColors = () => {
  const colorNumbers = [1, 2, 3, 4, 5];
  colorNumbers.forEach(number => {
    if(!$(`.color-box${number}`).hasClass('favorite')) {
    let color = generateColors();
    $(`.color-box${number}`).css("background-color", color)
    $(`.hex-code${number}`).text(color.toUpperCase())
  }
  });
}


const generateColors = () => {
const color = '#'+Math.floor(Math.random()*16777215).toString(16);
return color;
}

const toggleFavorite = (event) => {
  $(event.target).toggleClass('lock-icon')
  // $(event.target).toggleClass('unlock-icon')
  $(event.target).parents('.color-box').toggleClass('favorite');
}


$('.generate-btn').on('click', setColors)
$('.unlock-icon').on('click', toggleFavorite)

