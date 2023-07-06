import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

import { setPoints, setPointCap, point, indices, uvs } from '@/components/Statistics/datas';

export default function Grass(props) {
  const grass = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  // useFrame((state, delta) => grass.current.rotation.y += 0.01);

  // const [positions] = useMemo(() => {
  //   const width = 0.1;
  //   const grassLength = 2;
  //   const grassSegments = 1;
  //   const segmentLength = grassLength / grassSegments;
  //   const points = [];
  
  //   for (let i = 0; i < grassSegments; i++ ) {
  //     points.push(...setPoints({
  //       x: [-width, width],
  //       y: [i * segmentLength, segmentLength + i * segmentLength],
  //       z: [-width, width] 
  //     }))
  //   };

  //   points.push(...setPointCap({
  //     x: [-width, width],
  //     y: [0, segmentLength + grassSegments * segmentLength],
  //     z: [-width, width]
  //   }));

  //   return [
  //     new Float32Array(points),
  //   ]
  // }, [])


  // const size = 20;
  // const segments = 10;

  // const [colors, normals, positions] = useMemo(() => {
  //   const colorsArr = [];
  //   const normalsArr = [];
  //   const positionsArr = [];

  //   const halfSize = size / 2;
  //   const segmentSize = size / segments;

  //   // generate vertices, normals and color data for a simple grid geometry

  //   for (let i = 0; i <= segments; i++) {
  //     const y = i * segmentSize - halfSize;

  //     for (let j = 0; j <= segments; j++) {
  //       const x = j * segmentSize - halfSize;

  //       positionsArr.push(x, -y, 0);
  //       normalsArr.push(0, 0, 1);

  //       const r = x / size + 0.5;
  //       const g = y / size + 0.5;

  //       colorsArr.push(r, g, 1);
  //     }
  //   }

  //   return [
  //     new Float32Array(colorsArr),
  //     new Float32Array(normalsArr),
  //     new Float32Array(positionsArr)
  //   ];
  // }, []);

  // const indices = useMemo(() => {
  //   const indicesArr = [];

  //   // generate indices (data for element array buffer)

  //   for (let i = 0; i < segments; i++) {
  //     for (let j = 0; j < segments; j++) {
  //       const a = i * (segments + 1) + (j + 1);
  //       const b = i * (segments + 1) + j;
  //       const c = (i + 1) * (segments + 1) + j;
  //       const d = (i + 1) * (segments + 1) + (j + 1);

  //       // generate two faces (triangles) per iteration

  //       indicesArr.push(a, b, d); // face one
  //       indicesArr.push(b, c, d); // face two
  //     }
  //   }

  //   return new Uint16Array(indicesArr);
  // }, []);


  return (
    <mesh
      ref={grass}
      scale={1}
      onPointerOver={event => setIsHovered(true)}
      onPointerOut={event => setIsHovered(false)}
      {...props}
      receiveShadow
    >
      <bufferGeometry attach="geometry" receiveShadow>
        
        

        {/* <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        />
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-color'
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-normal'
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        /> */}
        
        

        {positions.length > 0 && (
          <bufferAttribute
            attach='attributes-position'
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        )}
        {/* <bufferAttribute
          attach="attributes-position"
          array={point}
          count={point.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        /> */}
        {/* <bufferAttribute
          attach="uv"
          array={uvs}
          count={uvs.length}
          itemSize={2}
        /> */}
      </bufferGeometry>
      
      {/* <boxGeometry args={[5, 5, 5]} /> */}
      <meshToonMaterial attach="material" color={isHovered ? 'gray' : 'white'} />
    </mesh>
  )
}