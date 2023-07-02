import React, { useState, useEffect } from 'react';

import useCommits from '@/hooks/useCommits';


export default function Commit({ data }){
  const { setCommitDataFormat } = useCommits();
  const [commit, setCommit] = useState();

  useEffect(() => {
    setCommit(setCommitDataFormat(data));
  }, []);
  
  return commit && (
    <>
      <i>point</i>
      <div className='date'>
        <span>{ commit.day }일</span>
        <span>{ commit.time }</span>
      </div>
      <div className="info">
        <span className='repository'>{ commit.repository }</span>
        <p>{ commit.message }</p>
      </div>
    </>
  )
}