import React, { useState, useEffect } from 'react';

import useStore from '@/store';
import useCommits from '@/hooks/useCommits';

import Toolbar from '@/components/Toolbar';
import CommitList from '@/components/CommitList';
import CommitDetail from '@/components/CommitDetail';

import RadioGroup from '@/modules/RadioGroup';

export default function CommitHistory({ repositories }){
  const { commitList } = useStore();
  const { updateCommitList, updateCommitDetail } = useCommits();
  
  const [loading, setLoading] = useState({ list: false, detail: false });
  const [repoName, setRepoName] = useState(null);
  const [repoStates, setRepoStates] = useState([]);
  
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

  useEffect(() => {
    if (repoName) {
      setLoading({ ...loading, list: true, detail: true });
      updateCommitList({ repo: repoName });
    }
  }, [repoName]);

  useEffect(() => {
    if (repoName && commitList.length > 0 ) {
      updateCommitDetail({ 
        repo: repoName, 
        hash: commitList[0]?.sha
      });
    }
  }, [commitList])

  const updateLoading = state => {
    setLoading({ ...loading, ...state })
  };
  
  return (
    <>
      <Toolbar 
        title={"커밋 기록"}
        first={
          <RadioGroup
            dataSet={repoStates}
            onChange={states => setRepoStates(states)}
          /> 
        }
      />
      <div className="commit-info">
        <CommitList repoName={repoName} loading={loading.list} onLoadingState={updateLoading} />
        <CommitDetail loading={loading.detail} onLoadingState={updateLoading} />
      </div>
    </>
  )
}