import React from 'react';

export default function Tooltip({ isVisible, data, position }){
  return isVisible && (
    <div
      className="tooltip" 
      style={{ top: position.y, left: position.x }}
    >
      <span>{data.date}</span>
      <p>{data.text}</p>
    </div>
  )
};