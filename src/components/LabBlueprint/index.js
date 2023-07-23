import React, { useRef, useState, useEffect} from 'react';
import { animated, useSpring, useSprings, useSpringRef, useChain } from '@react-spring/web';

import useSpringToValue from '@/hooks/useSpringToValue';

import Viewer from './Viewer';
import Backface from './Backface';

export default function Blueprint({ index, data }) {
  const {
    toBlueprintMotion,
    toBluepringStickLength,
    toBluepringStickDegree,
  } = useSpringToValue();

  const printRef = useRef(null);
  const [printPos, setPrintPos] = useState();
  const [isViewerActive, setIsViewerActive] = useState(false);
  const [isBackfaceActive, setIsBackfaceActive] = useState(false);

  useEffect(() => {
    if(printRef.current) {
      const { top, left, width, height } = printRef.current.getBoundingClientRect(); 
      setPrintPos([top + height / 2, left + width / 2]);
    }
  }, []);

  const borderRef = useSpringRef();
  const [borderSprings] = useSprings(4, i => ({
    ref: borderRef,
    from: { value: 0 },
    to: { value: 100 },
    // delay: 240 * i,
    config: {
      duration: 320,
      tension: 220,
      friction: 10
    }
  }));

  const opacityRef = useSpringRef();
  const opacitySpring = useSpring({
    ref: opacityRef,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 100,
      tension: 220,
      friction: 15
    },
    onRest: () => setIsBackfaceActive(true)
  });
  
  const hoverRef = useSpringRef();
  const [hoverSpring, hoverApi] = useSpring(() => ({
    ref: hoverRef,
    transform: [0, 0],
    config: {
      mass: 1,
      tension: 180,
      friction: 10
    }
  }));

  useChain([borderRef, hoverRef, opacityRef], [0, 0, 1], 580);

  const setSensitive = value => {
    return (x, y) => toBlueprintMotion(x * value, y * value)
  };
  
  const onHover = event => {
    const [top, left] = printPos;
    const setPos = (x, y) => [(x - left) / 4, (y - top) / 4];
    const eventType = event.type === 'touchmove' ? event.touches[0] : event;
    
    hoverApi.start({
      transform: setPos(eventType['clientX'], eventType['clientY'])
    })
  };
  
  const onLeave = () => hoverApi.start({ transform: [0, 0] });

  const onChangeViewerState = state => setIsViewerActive(state);

  return (
    <div ref={printRef} className="blueprint">
      <animated.div
        className="front-face"
        style={{ 
          transform: hoverSpring.transform.to(setSensitive(1)),
          opacity: opacitySpring.opacity
        }}
        onClick={() => setIsViewerActive(true)}
        onMouseMove={event => onHover(event)}
        onMouseLeave={() => onLeave()}
      >
        <animated.div
          className="visual"
          style={{ transform: hoverSpring.transform.to(setSensitive(-0.6)) }}
        >
          {[index + 1, data.library, data.title].map((data, index) => (
            <animated.span
              key={`bg_${index}`}
              style={{ transform: hoverSpring.transform.to(setSensitive(-index * 0.8)) }}
            >
              { data }
            </animated.span>
          ))}
        </animated.div>
        <animated.div
          className="text"
          style={{ transform: hoverSpring.transform.to(setSensitive(-0.3)) }}
        >
          <p>{ data.title }</p>
          <span>{ data.description }</span>
        </animated.div>
      </animated.div>

      <Backface
        isActive={isBackfaceActive}
        borderSprings={borderSprings}
        length={hoverSpring.transform.to(toBluepringStickLength)}
        degree={hoverSpring.transform.to(toBluepringStickDegree)} 
      />
      
      <Viewer isActive={isViewerActive} onChangeState={onChangeViewerState}>
        { data.contents }
      </Viewer>
    </div>
  )
}