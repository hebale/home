import React, { useRef, useCallback } from 'react';
import { Physics, useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

import useStore from '@/store';

import Grass from './Grass';

export default function Ground() {
  const { contributionData } = useStore();

  const Pointer = useCallback(({ radius }) => {
    const position = [0, 0, 0];
    const [ref, api] = useSphere(() => ({ args: [radius], position, type: 'Static' }), useRef(null));
  
    useFrame(({ mouse: { x, y }, viewport: { height, width }}) => {
      api.position.set(40 + (x * width / 2), 0, 4 -(y * height) / 2);
    });
  
    return (
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 10, 10]} />
        <meshBasicMaterial attach="material" visible={false} />
      </mesh>
    )
  }, []);

  return (
    <Physics gravity={[0, 80, 0]}>
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