import React, { useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';

export default function Camera(){
  const cameraRef = useRef();
  
  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        args={[45, 800 / 600, 1, 1000]}
        position={[0, 0, 20]}
        fov={25}
      />
    </>
  )
}