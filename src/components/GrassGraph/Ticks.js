import React, { useRef, useState, useEffect } from 'react';
import { Text3D } from "@react-three/drei";

import useStore from '@/store';

const axisXConfig = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const axisYConfig = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Ticks(){
  const { contributionData } = useStore();
  const axisTick = useRef();
  const [monthData, setMonthData] = useState({ index: [], position: [] });

  useEffect(() => {
    if (contributionData.length > 0) {
      axisTick.current.rotation.x = -8;
  
      setMonthData(
        contributionData.reduce((a, b, index) => {
          const month = parseInt(b.date.split('-')[1], 10) - 1;
      
          if (a.index.at(-1) !== month) {
            a.index.push(month);
            a.position.push( Math.ceil(index / 7));
          }
          return a;
        }, { index: [], position: [] })
      )
    };
  }, [contributionData]);
  
  return (
    <>
      <mesh ref={axisTick} position={[-3.5, 0, 0.4]}>
        {monthData.index.map((month, index) => (
          <Text3D
            key={index}
            position={[2.9 + 1.6 * monthData.position[index], 0, 5.5]}
            font={'/assets/json/SUIT_Regular.json'}
            scale={0.8}
          >
            { axisXConfig[month] }
            <meshToonMaterial attach="material" color="#666" />
          </Text3D>
        ))}
        {axisYConfig.map((week, index) => (
          <Text3D
            key={week}
            position={[0, 1.65 * -index, 0]}
            font={'/assets/json/SUIT_Regular.json'}
            scale={0.6}
            {...(week === 'Wed' && { letterSpacing: -0.05 })}
          >
            { week }
            <meshToonMaterial attach="material" color="#666" />
          </Text3D>
        ))}
      </mesh>
    </>
  )
}