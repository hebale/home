import React, { useState, useEffect } from 'react';

import useCommits from '@/hooks/useCommits';

import List from './List';
import Detail from './Detail';

import Toolbar from '@/modules/Toolbar';
import RadioGroup from '@/modules/RadioGroup';

export default function CommitHistory({ repositories }){
  const { resetCommitList, resetCommitDetail } = useCommits();
  
  const [loading, setLoading] = useState({ list: false, detail: false });
  const [repoName, setRepoName] = useState(null);
  const [repoStates, setRepoStates] = useState([]);

  useEffect(() => {
    return () => {
      resetCommitList();
      resetCommitDetail();
    }
  }, [])
  
  useEffect(() => {
    if (repositories.length > 0) {
      setRepoStates(
        repositories.map((repo, index) => {
          const repoState = {};
          repoState[repo] = index === 0;
          
          return repoState;
        })
      )
    }
  }, [repositories]);
    
  useEffect(() => {
    if (repoStates.length > 0) {
      setRepoName(repoStates.reduce((a, b) => {
          const [key, value] = Object.entries(b)[0];
          if (value) a = key;
          return a;
        }, '')
      );
    }
  },[repoStates]);

  const updateLoading = state => {
    setLoading({ ...loading, ...state })
  };
  
  return (
    <>
      <Toolbar 
        title='커밋 기록'
        first={
          <RadioGroup
            dataSet={repoStates}
            onChange={states => setRepoStates(states)}
          /> 
        }
      />
      <div className="commit-info">
        <List loading={loading.list} repoName={repoName} onLoadingState={updateLoading} />
        <Detail loading={loading.detail} repoName={repoName} onLoadingState={updateLoading} />
      </div>
    </>
  )
}