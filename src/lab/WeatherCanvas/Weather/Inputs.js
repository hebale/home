let div, select, slider, range;
const weather = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];

export default function Inputs(p5) {
  div = p5.createDiv();
  select = p5.createSelect();
  slider = p5.createDiv();
  range = p5.createSlider(1, 8, 1);

  for (let state of weather) {
    select.option(state);
  }
  select.disable('Sunny');
  select.disable('Cloudy');

  select.selected(weather[2]);  
  slider.child(range);
  
  div.addClass('weather-ctrl');
  div.child(select);
  div.child(slider);

  return {
    select,
    range
  }
};