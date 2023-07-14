import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Environments from './Environments';
import Camera from './Camera';
import Ticks from './Ticks';
import Ground from './Ground';

export default function GrassCanvas(){
  const [loading, setLoading] = useState(true);

  return (
    <div className={`grass-canvas${loading ? ' loading' : ''}`}>
      <Canvas onCreated={() => setLoading(false)}>
        {/* <Environments /> */}
        <Camera />
        <Ground />
        <Ticks />
      </Canvas>
    </div>
  );
}