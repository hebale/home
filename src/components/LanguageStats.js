import React, { useState, useEffect, useCallback } from 'react';

import useStore from '@/store';
import useStatistics from '@/hooks/useStatistics';

import CheckboxGroup from '@/modules/CheckboxGroup';
import Toolbar from '@/modules/Toolbar';
import BarChart from '@/modules/BarChart';

export default function LangChart({ repositories }) {
  const { languageData } = useStore();
  const { updateLanguageData, chartDataFilter } = useStatistics();

  const [repoStates, setRepoStates] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    updateLanguageData();
  }, [])
  
  useEffect(() => {
    if(repositories.length > 0) {
      setRepoStates(
        repositories.map(repo => {
          const repoState = {};
          repoState[repo] = true;

          return repoState;
        })
      )
    }
  }, [repositories])
  
  useEffect(() => {
    if (repoStates.length > 0) {
      setChartData(chartDataFilter({ languageData, repoStates }));
    }
  }, [languageData, repoStates])

  const getActiveRepositories = useCallback(repoStates => {
    return repoStates.reduce((a, b) => {
      const [key] = Object.entries(b);
      a.push(key[0]);

      return a;
    }, []);
  }, []);

  return (
    <>
      <Toolbar 
        title={"사용언어 통계"}
        first={
          <CheckboxGroup
            addIcon={<i></i>}
            dataSet={repoStates}
            onChange={states => setRepoStates(states)}
          />
        }
      />
      <BarChart 
        data={chartData}
        keys={getActiveRepositories(repoStates)}
        indexBy={"key"}
      />
    </>
  )
};
