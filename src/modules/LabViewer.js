import React from 'react';
import { animated, useSpring } from '@react-spring/web';

import useSpringToValue from '@/hooks/useSpringToValue';

export default function LabViewer({ isLoading, isActive, children }) {
  const { toViewSize } = useSpringToValue;

  const [viewSpring, viewApi] = useSpring(() => ({
    loaded: false,
    width: 218,
    height: 268,
    config: {
      duration: 280,
      friction: 100
    },
    onRest: result => setIsLoaded(result.value.loaded)
  }));

  const onViewer = () => {
    viewApi.start({ loaded: true, width: 800, height: 600 });
    setIsActive(true);
  };

  const offViewer = () => {
    viewApi.start({ loaded: false, width: 218, height: 268 });
    setIsActive(false);
  };
  
  return (
    <animated.div
      className={`contents${isLoaded ? '' : ' loading'}${isActive ? ' active' : ''}`}
      style={{
        width: viewSpring.width.to(toViewSize),
        height: viewSpring.height.to(toViewSize)
      }}
    >
      <button type="button">닫기</button>
      { children }
    </animated.div>
  );
}