import React, { useRef } from 'react';
import { Physics, useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

import useStore from '@/store';

import Grass from './Grass';

function Pointer({ radius }){
  const position = [0, 0, 0];
  const [ref, api] = useSphere(() => ({ args: [radius], position, type: 'Static' }), useRef(null));

  useFrame(({ mouse: { x, y }, viewport: { height, width }}) => {
    api.position.set((x * width / 2) + 40, 1, 4 -(y * height) / 2);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshBasicMaterial attach="material" visible={false} />
    </mesh>
  )
};

export default function Ground({ onRendered }) {
  const { contributionData } = useStore();

  return (
    <Physics gravity={[0, 120, 15]} onAfterRender={() => onRendered()}>
      <Pointer radius={0.4} />

      {contributionData.map((day, index) => {
        const gap = 1.6;  
        const axisX = gap * parseInt(index / 7, 10);
        const axisZ = (index % 7) * gap;
      
        return (
          <Grass
            key={day.date}
            level={day.level}
            position={[axisX, 0, axisZ]}
          />
        )
      })}
    </Physics>
  )
}