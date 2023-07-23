import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

import { debounce, throttle } from '@/common/util';

export default function Wrapper({ sketch, mouseMoved }) {
  const wrapper = useRef(null);

  useEffect(() => {
    const { clientWidth, clientHeight } = wrapper.current;
    const setSketch = p5 => sketch(p5, clientWidth, clientHeight);

    const canvas = new p5(setSketch, wrapper.current);
  
    canvas.windowResized = debounce(() => {
      canvas.resizeCanvas(canvas.windowWidth, canvas.windowHeight);
    }, 100);

    if (mouseMoved) {
      canvas.mouseMoved = throttle(mouseMoved, 10);
    }
  
    return () => {
      canvas.remove();
    }
  }, [sketch]);

  return <div ref={wrapper} className='visual-weather' />
};