import React, { useState, useEffect } from 'react';

import useStore from '@/store';

import GrassGraph from '@/components/GrassGraph';
import CommitHistory from '@/components/CommitHistory';
import LanguageStats from '@/components/LanguageStats';

export default function Statistics() {
  const { repositories } = useStore();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await repositories;
      setRepos(data);
    })()
  }, []);

  return (
    <div className="statistics">
      <div className="stat-group">
        <GrassGraph />
      </div>
      <div className="stat-group">
        <CommitHistory repositories={repos} />
      </div>
      <div className="stat-group">
        <LanguageStats repositories={repos} />
      </div>
    </div>
  )
};