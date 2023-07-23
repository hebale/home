import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

import useStore from '@/store';
import LabBlueprint from '@/components/LabBlueprint';

export default function Lab() {
  const { blueprintData } = useStore();
  const [isActive, setIsActive] = useState(false);
  
  const textSpring = useSpring({
    from: { top: 135 },
    to: { top: 0 },
    config: {
      tension: 180
    },
    onRest: () => setIsActive(true)
  });
  
  return (
    <div className="lab">
      <p>
        <animated.span style={textSpring}>생각의 기록들</animated.span>
      </p>
      <ul className="blueprint-wrap">
        {isActive && blueprintData.map((blueprint, index) => (
          <li key={blueprint.title}>
            <LabBlueprint index={index} data={blueprint} />
          </li>
        ))}
      </ul>
    </div>
  )
}