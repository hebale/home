import React from 'react';
import { animated } from '@react-spring/web';

import useSpringToValue from '@/hooks/useSpringToValue';

const borderClass = ['top-border', 'right-border', 'bottom-border', 'left-border'];
const stickClass = ['top-left-line', 'top-right-line', 'bottom-left-line', 'bottom-right-line'];

export default function Backface({ isActive, borderSprings, length, degree }){
  const { toBlueprintBorder } = useSpringToValue();
  return (
    <div className={`back-face${ isActive ? ' active' : ''}`}>
      {borderSprings.map(({ value }, index) => (
        <animated.span
          key={borderClass[index]}
          className={borderClass[index]}
          style={{
            ...((borderClass[index].indexOf('top') + borderClass[index].indexOf('bottom') > -2 ) && { width: value.to(toBlueprintBorder) }),
            ...((borderClass[index].indexOf('right') + borderClass[index].indexOf('left') > -2 ) && { height: value.to(toBlueprintBorder) })
          }}
        />
      ))}
      {stickClass.map(className => (
        <animated.span
          key={className}
          className={className}
          style={{ height: length, transform: degree }}
        />
      ))}
    </div>
  );
};