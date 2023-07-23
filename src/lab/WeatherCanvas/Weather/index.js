import Inputs from './Inputs';
import { SnowFlake, DropFlake } from './Flakes';

let flakes = [];
let zAngle = 0;

let weatherValue;
const weatherFlakes = {
  Sunny: null,
  Cloudy: null,
  Rainy: DropFlake,
  Snowy: SnowFlake
};

export const sketch = (p5, width, height) => {
  p5.setup = () => {
    p5.frameRate(40);
    p5.createCanvas(width, height);
    p5.strokeWeight(0.6);
    p5.drawingContext.strokeStyle = '#333'
    
    weatherValue = Inputs(p5);
  };
  
  p5.draw = () => {
    const { select, range } = weatherValue;
    p5.background(255);

    for (let i = 0; i < range.elt.valueAsNumber; i++) {
      flakes.push(
        new weatherFlakes[select.elt.value](p5)
      );
    };

    for (let flake of flakes) {
      flake.update(zAngle, flakes);
      
      if(flake.posY > p5.height || flake.posY1 > p5.height) {
        let index = flakes.indexOf(flake);
        flakes.splice(index, 1);
      } else {
        flake.display(zAngle);
      }
    }
  };
};

export const mouseMoved = event => {
  const { view, x } = event;
  zAngle = ((x / view.innerWidth) - 0.5) * 15;
};