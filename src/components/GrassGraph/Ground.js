import React, { useRef, useCallback, useState } from 'react';
import { Physics, useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';

import useStore from '@/store';

import Grass from './Grass';

export default function Ground({ position, onGrassHover }) {
  const { contributionData } = useStore();
  const [posX, posY, posZ] = position;

  const Pointer = useCallback(({ radius, onCollide, onCollideBegin, onCollideEnd }) => {
    const position = [0, 0, 0];
    const [ref, api] = useSphere(() => ({ args: [radius], position, onCollide, onCollideBegin, onCollideEnd, type: 'Static' }), useRef(null));
  
    useFrame(({ mouse: { x, y }, viewport: { height, width }}) => {
      api.position.set(posX + (x * width / 2), 0, posZ -(y * height) / 2);
    });
  
    return (
      <mesh ref={ref}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshBasicMaterial attach="material" visible={true} />
      </mesh>
    )
  }, []);

  return (
    <Physics gravity={[0, 80, 0]}>
      <Pointer
        radius={0.3}
        onCollide={event => onGrassHover({ data: event.contact.bj.userData })}
        onCollideBegin={() => onGrassHover({ visible: true })}
        onCollideEnd={() => onGrassHover({ visible: false })}
      />

      {contributionData.map((day, index) => {
        const gap = 1.6;  
        const axisX = gap * parseInt(index / 7, 10);
        const axisZ = (index % 7) * gap;

        return (
          <Grass
            key={day.date}
            data={day}
            level={day.level}
            position={[axisX, 0, axisZ]}
          />
        )
      })}
    </Physics>
  )
}