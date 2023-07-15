import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

import Environments from './Environments';
import Ticks from './Ticks';
import Camera from './Camera';
import Ground from './Ground';

export default function GrassCanvas(){
  const [loading, setLoading] = useState(true);
  const position = [40, 0, 4];

  return (
    <div className={`grass-canvas${loading ? ' loading' : ''}`} >
      <Ticks onRendered={() => setLoading(false)}/>
      <Canvas>
        {/* <Environments /> */}
        <Camera position={position} />
        <Ground position={position} />
      </Canvas>
    </div>
  );
}