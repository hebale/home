import React, { useState, useEffect } from 'react';

import useStore from '@/store';

const axisXConfig = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const axisYConfig = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Ticks({ onRendered }){
  const { contributionData } = useStore();
  const [monthData, setMonthData] = useState({ index: [], position: [] });

  useEffect(() => {
    if (contributionData.length > 0) {
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
      onRendered();
    };
  }, [contributionData]);

  return (
    <>
      <div className="axis-x">
        {monthData.index.map((month, index) => (
          <span
            key={index}
            style={{ left: `${19.2 * monthData.position[index]}px` }}
            >
            { axisXConfig[month] }
          </span>
        ))}
      </div>
      <div className="axis-y">
        {axisYConfig.map((week, index) => (
          <span
            key={week}
            style={{ top: `${19.2 * index}px` }}
          >
            { week }
          </span>
        ))}
      </div>
    </>
  )
}