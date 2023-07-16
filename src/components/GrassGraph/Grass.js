import React, { createRef, useRef, createContext, useContext, useCallback } from 'react';

import { useBox, useConeTwistConstraint } from '@react-three/cannon';
import { Edges } from '@react-three/drei';

const parent = createContext({
  position: [0, 0, 0],
  ref: createRef()
})

export default function Grass({
  data,
  level,
  position
}) {
  const args = [1,1];
  const [ref] = useBox(() => ({
    type: 'Static',
    args,
    position
  }), useRef(null));
  
  const GrassLink = useCallback(({ length }) => {
    const { position: [x, y, z], ref: parentRef } = useContext(parent);
    const args = [1, length, 1];
    const position = [x, y, z];
  
    const [ref] = useBox(() => ({
        args,
        position,
        linearDamping: 0.9,
        mass: 1,
        userData: {
          date: `${data.date} (${data.week})`,
          text: `${data.count} contribution${data.count > 1 ? 's' : ''}`
        }
      }),
      useRef(null)
    );
  
    useConeTwistConstraint(parentRef, ref, {
      angle: -Math.PI / 2,
      axisA: [0, 1, 0],
      axisB: [0, 1, 0],
      pivotA: [0, 0, 0],
      pivotB: [0, -length / 2, 0],
      twistAngle: 0
    });
  
    return (
      <>
        <mesh ref={ref}>
          <boxGeometry args={args} />
          <meshBasicMaterial
            attach="material"
            color="#333"
            transparent={true}
            opacity={0.25 * length}
          />
          <Edges color={length > 3 ? '#fff' : '#333'}/>
        </mesh>
      </>
    )
  }, []);


  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={[1, 0.2, 1]} />
        {level > 0 && <meshBasicMaterial attach="material" visible={false} />}
      </mesh>

      {level > 0 && (
        <parent.Provider value={{ position, ref }}>
          <GrassLink
            length={level}
          />
        </parent.Provider>
      )}
    </>
  )
}