import React from 'react';
import { Canvas } from '@react-three/fiber';

import Camera from '@/components/Statistics/Camera';
import Environments from '@/components/Statistics/Environments';
import Grass from '@/components/Statistics/Grass';

export default function Statistics(props) {
  return (
    <Canvas shadows camera={{ position: [-15, 10, 15], fov: 15 }}>
      <color attach='background' args={['#eee']} />
      <axesHelper scale={10} />

      {/* <Camera /> */}
      <Environments castShadow />
      <Grass position={[ 0, 0, 0 ]} castShadow />
    </Canvas>
  )
}