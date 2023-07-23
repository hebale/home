import React from 'react';

import Wrapper from './Wrapper';
import { sketch, mouseMoved } from './Weather';

export default function WeatherCanvas() {
  return (
    <Wrapper sketch={sketch} mouseMoved={mouseMoved} />
  )
};