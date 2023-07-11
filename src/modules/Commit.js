import React from 'react';

export default function Commit({ data }) {
  return (
    data.type === 'date' ? (
      <p>
        <i>main</i>{ data.group }
      </p>
    ) : (
      <>
        <i>main</i>
        <div className='date'>
          <span>{ data.day }일</span>
          <span>{ data.time }</span>
        </div>
        <div className="info">
          <p>{ data.message }</p>
          <span className='tag'>{ data.tag }</span>
          <span>{ data.author }</span>
        </div>
      </>
    )
  )
}