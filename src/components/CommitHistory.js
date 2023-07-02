import React, { useEffect } from 'react';
import { getYear, getMonth } from 'date-fns';

import useStore from '@/store';
import useCommits from '@/hooks/useCommits';

import Commit from '@/components/Commit'

export default function CommitHistory({ title }){
  const { commitData } = useStore();
  const { updateCommitData } = useCommits();

  useEffect(() => {
    const now = new Date();
    const date = `${getYear(now)}-${getMonth(now) + 1}`;
    
    updateCommitData({ page: 1 });
  }, []);

  return (
    <>
      <p>{ title }</p>
      <div className="commit-history">
        <div className='list'>
          <p>date</p>
          <ul> 
            {commitData.map(commit => (
              <li key={commit.id}>
                <Commit data={commit}  />
              </li>
            ))}
          </ul>
        </div>
        <div className='detail'>
          detail
        </div>
      </div>
    </>
  )
}