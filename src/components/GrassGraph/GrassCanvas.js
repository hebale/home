import React, { useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';

import useStore from '@/store';
import { throttle } from '@/common/util'

import Environments from './Environments';
import Ticks from './Ticks';
import Camera from './Camera';
import Ground from './Ground';
import Tooltip from './Tooltip';
import Legend from './Legend';

export default function GrassCanvas(){
  const position = [40, 0, 5];

  const { contributionData } = useStore();
  const canvasRef = useRef();
  const [loading, setLoading] = useState(true);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState();
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0});

  const onCanvasPointMove = useCallback(throttle(event => {
      const { x, y } = canvasRef.current.getBoundingClientRect();
      setTooltipPosition({ x: event.clientX - x, y: event.clientY - y })
    }, 10),
    []
  );

  const onGrassHover = ({ visible, data }) => {
    if (data) setTooltipData(data);
    if (visible !== undefined) setTooltipVisible(visible);
  };
  
  return (
    <>
      <div className="inner scroll">
        <div className={`grass-canvas${loading ? ' loading' : ''}`} >
          <Ticks onRendered={() => setLoading(false)}/>
          <Canvas
            ref={canvasRef} 
            onPointerMove={onCanvasPointMove}
          >
            {/* <Environments /> */}
            <Camera position={position} />
            {contributionData.length > 0 && (
              <Ground data={contributionData} position={position} onGrassHover={onGrassHover}/>
            )}
          </Canvas>
          <Legend />
        </div>
      </div>
      <Tooltip
        isVisible={tooltipVisible}
        data={tooltipData}
        position={tooltipPosition}
      />
    </>
  );
}