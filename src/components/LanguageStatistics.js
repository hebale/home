import React, { useState, useEffect, useCallback } from 'react';

import useStore from '@/store';
import useStatistics from '@/hooks/useStatistics';

import BarChart from '@/components/BarChart';

export default function LangChart({ title }) {
  const { repositories, languageData } = useStore();
  const { chartDataFilter } = useStatistics();

  const [reposState, setReposState] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    (async () => {
      const data = await repositories;
      const repos = data.map(el => {
        const result = {};
        result[el] = true;
        
        return result
      });

      setReposState(repos);
    })()
  }, [repositories])
  
  useEffect(() => {
    if (reposState.length > 0) {
      setChartData(
        chartDataFilter({ languageData, reposState })
      );
    }
  }, [languageData, reposState])

  const getRepositories = useCallback(reposState => {
    return reposState.reduce((a, b) => {
      const [key] = Object.entries(b);
  
      a.push(key[0]);
      return a;
    }, [])
  }, []);

  const onChnageChartRepos = event => {
    const { checked, value } = event.target;

    setReposState(
      reposState.map(repos => {
        if(repos.hasOwnProperty(value)) repos[value] = checked;
        return repos;
      })
    );
  };
  
  return (
    <>
      <p>{ title }</p>
      <div className='chart-ribbon'>
        {reposState.length > 0 && reposState.map(repo => {
          const [key, value] = Object.entries(repo)[0];
          
          return (
            <label className={key} key={key}>
              <input type="checkbox" 
                name="repository" 
                value={key}
                checked={value}
                onChange={onChnageChartRepos}
              />
              <i></i>
              <span>{ key }</span>
            </label>
          )})}
      </div>

      <BarChart 
        data={chartData}
        keys={getRepositories(reposState)}
        indexBy={"key"}
      />
    </>
  )
};
