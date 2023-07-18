import React, { useEffect } from 'react';

import useStatistics from '@/hooks/useStatistics';
import Toolbar from '@/modules/Toolbar';

import GrassCanvas from './GrassCanvas';

export default function GrassGraph() {
  const { getContributionData, resetContributionData } = useStatistics();

  useEffect(() => {
    getContributionData();
    return () => resetContributionData();
  }, []);
  
  return (
    <>
      <Toolbar title="깃허브 기여도"/>
      <div className="grass-graph">
        <GrassCanvas />
      </div>
    </>
  )
}