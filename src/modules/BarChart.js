import React, { useCallback } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const chartStyle = {
  layout: "horizontal",
  margin: { top: 0, right: 0, bottom: 50, left: 60 },
  enableLabel: false,
  padding: 0.45,
  defs: [
    {
      id: 'lines',
      type: 'patternLines',
      rotation: -45,
      lineWidth: 1.2,
      spacing: 4,
      color: '#333'
    },
    {
      id: 'lines2',
      type: 'patternLines',
      rotation: 90,
      lineWidth: 1.2,
      spacing: 3.5,
      color: '#333'
    },
    {
      id: 'dots',
      type: 'patternDots',
      size: 2.8,
      padding: 0.8,
      stagger: true,
      color: '#333',
    },
    {
      id: 'squares',
      type: 'patternSquares',
      size: 2.5,
      padding: 2.5,
      stagger: false,
      color: '#333',
    }
  ],
  fill: [
    { match: { id: 'hello' }, id: 'lines' },
    { match: { id: 'gojiri' }, id: 'lines2' },
    { match: { id: 'blind-chat' }, id: 'squares' },
    { match: { id: 'halloween' }, id: 'dots' }
  ],
  enableGridY: false,
  enableGridX: true
};

export default function BarChart({ data, keys, indexBy }) {
  const tooltip = useCallback( tick => (
    <div className="tooltip">
      <p>{ tick.indexValue }</p>
      <ul>
        <li>
          <span>{ tick.id }</span>
          <strong>{ tick.value.toLocaleString() }</strong>
        </li>
        <li>
          <span>total</span>
          <strong>{ tick.data.total.toLocaleString() }</strong>
        </li>
      </ul>
    </div>
  ), []);

  return (
    <div className={`bar-graph${!data.length ? ' loading': ''}`}>
      {!!data.length && ( 
        <ResponsiveBar 
          data={data}
          keys={keys}
          indexBy={indexBy}
          axisBottom={{
            legend: "unit (byte)",
            legendOffset: 35
          }}
          tooltip={tooltip}
          {...chartStyle}
        />
      )}
    </div>
  )
}