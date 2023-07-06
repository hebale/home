import React from 'react';

export default function Toolbar({ title, first, second }) {
  return (
    <div className="toolbar">
      <p>{ title }</p>
      <div>
        <div>{ first }</div>
        <div>{ second }</div>
      </div>
    </div>
  )
}