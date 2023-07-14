import React, { useRef } from 'react';
import { OrthographicCamera } from '@react-three/drei';

export default function Camera(){
  const cameraRef = useRef();
  
  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[40, 10, 5.5]}
        rotation={[-1.40, 0, 0]}
        zoom={12}
      />
    </>
  )
}