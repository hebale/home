import React, { useState, useEffect, useCallback } from 'react';

import useStore from '@/store';
import CheckboxGroup from '@/modules/CheckboxGroup';
import DifferView from '@/modules/DifferView';

export default function Detail({ loading, onLoadingState }) {
  const { commitDetail } = useStore();
  
  const [detail, setDetail] = useState();
  const [checkData, setCheckData] = useState();
  const [checkLabel, setCheckLabel] = useState();

  useEffect(() => {
    if(commitDetail.hasOwnProperty('sha')) {
      onLoadingState({ detail: false });
      setDetail(commitDetail);

      setCheckData(
        Object.entries(commitDetail.status).map(([key]) => {
          const obj = {};
          obj[key] = true;

          return obj;
        })
      );
      setCheckLabel(
        Object.entries(commitDetail.status).reduce((a, b) => {
          if(!a.hasOwnProperty(b[0])) a[b[0]] = `${b[0]}: ${b[1]}`;
          return a;
        }, {})
      );
    }

    return () => {
      setDetail(null);
      setCheckData(null);
      setCheckLabel(null);
    }
  }, [commitDetail]);

  const setDifferView = useCallback(files => {
    if (!checkData) return [];

    const viewChecks = checkData.reduce((a, b) => {
      const [key, value] = Object.entries(b)[0];
      if (value) a.push(key);

      return a;
    }, []);

    return files.filter(file => viewChecks.indexOf(file.status) > -1 );
  }, [checkData]);

  return (
    <div className={`detail${!detail || loading ? ' loading' : ''}`} >
      {detail && (
        <>
          <div className="head">
            <div className='inner'>
              <p>{ detail.message }</p>
              <span>{ detail.author }</span>
              <span>{ detail.date }</span>
              <span>{ detail.sha }</span>
              <CheckboxGroup
                dataSet={checkData}
                labelName={checkLabel}
                onChange={setCheckData}
              />
            </div>
          </div>
          <div className='body'>
            <div className='inner scroll'>
              {checkData && setDifferView(detail.files).map(file => (
                  <DifferView file={file} key={file.sha} />
                ))
              }
            </div>
          </div>
        </>
      )}
    </div>
  )
}