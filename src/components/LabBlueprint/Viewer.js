import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';

import useSpringToValue from '@/hooks/useSpringToValue';

export default function Viewer({ isActive, onChangeState, children }) {
  const { toViewerSize } = useSpringToValue();
  const [isLoaded, setIsLoaded] = useState(false);

  const [viewSpring, viewApi] = useSpring(() => ({
    loaded: false,
    width: 700,
    height: 500,
    opacity: 0,
    config: {
      mass: 1,
      tension: 340,
      friction: 20
    },
    onRest: result => setIsLoaded(result.value.loaded)
  }));

  useEffect(() => {
    if(isActive) {
      viewApi.start({ loaded: true, width: 800, height: 600, opacity: 1 });
    }
  }, [isActive]);

  const onCloseViewer = () => {
    viewApi.start({ loaded: false, width: 780, height: 580, opacity: 0 });
    onChangeState(false);
  };
  
  return (
    <animated.div
      className={`contents${isLoaded ? '' : ' loading'}${isActive ? ' active' : ''}`}
      style={{
        width: viewSpring.width.to(toViewerSize),
        height: viewSpring.height.to(toViewerSize),
        opacity: viewSpring.opacity
      }}
    >
      <button type="button" onClick={onCloseViewer}>닫기</button>
      { isLoaded && children }
    </animated.div>
  );
}