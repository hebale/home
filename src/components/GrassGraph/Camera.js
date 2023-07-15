import React from 'react';
import { OrthographicCamera } from '@react-three/drei';

export default function Camera({ position }){
  return (
    <>
      <OrthographicCamera
        makeDefault
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        near={-10}
        far={10}
        zoom={12}
      />
    </>
  )
}