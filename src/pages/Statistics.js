import React, { useEffect } from 'react';

import useStatistics from '@/hooks/useStatistics';

import CommitHistory from '@/components/CommitHistory';
import LanguageStatistics from '@/components/LanguageStatistics';

export default function Statistics() {
  const { updateLanguageData } = useStatistics();

  useEffect(() => {
    updateLanguageData();
  }, []);

  return (
    <div className="statistics">
      {/* <div className="stat-group">
        <CommitHistory title={"커밋 기록"} />
      </div> */}
      <div className="stat-group">
        <LanguageStatistics title={"사용언어 통계"} />
      </div>
    </div>
  )
};