import React, { useState, useEffect, useCallback } from 'react';
import { animated, useChain, useTrail, useSpringRef } from '@react-spring/web';

import useStore from '@/store';
import useCommits from '@/hooks/useCommits';

import Commit from '@/modules/Commit';

export default function CommitList({ loading, repoName, onLoadingState }) {
  const { commitList } = useStore();
  const { updateCommitDetail } = useCommits();

  const [dateGroup, setDateGroup] = useState([]);
  const [detailHash, setDetailHash] = useState(null);

  useEffect(() => {
    if(commitList.length > 0) {
      setDateGroup(
        commitList.reduce((a, b) => {
          if(a.indexOf(b.group) === -1) a.push(b.group);
          return a;
        },[])
      )
      
      setDetailHash(commitList[0].sha);
      onLoadingState({ list: false })
    };
  }, [commitList])
  
  const groupCommits = useCallback((date, datas) => {
    return datas.filter(data => data.group === date);
  }, []);

  // useEffect(() => {
  //   if(detailParams.repo) updateCommitDetail(detailParams);
  // }, [detailParams])

  // react-spring
  // const groupRef = useSpringRef();
  // const groupTrail = useTrail(dateGroup.length, {
  //   ref: groupRef,
  //   from: { opacity: 0, y: 15 },
  //   to: { opacity: 1, y: 0 },
  //   delay: 250,
  //   config: {
  //     mass: 0.5,
  //     tension: 200,
  //     friction: 22,
  //   }
  // });

  // const commitsRef = useSpringRef();
  // const commitTrail = useTrail(5, {
  //   ref: commitsRef,
  //   from: { opacity: 0, y: 15 },
  //   to: { opacity: 1, y: 0 },
  //   delay: 250,
  //   config: {
  //     mass: 0.5,
  //     tension: 200,
  //     friction: 22,
  //   }
  // });

  // useChain([groupRef, commitsRef])
  
  const onClickCommit = (repo, hash) => {
    onLoadingState({ detail: true });
    updateCommitDetail({ repo, hash });
    setDetailHash(hash);
  };

  return (
    <div className={`list scroll${!dateGroup.length || loading ? ' loading' : ''}`}>
      {dateGroup.map(date => (
        <div className="inner" key={`${repoName}_${date}`}>
          <p>{ date }</p>
          <ul> 
            {groupCommits(date ,commitList).map((commit, index) => (
              <li 
                key={commit.id}
                {...(detailHash === commit.sha && { className: 'selected' })}
                onClick={() => onClickCommit(repoName, commit.sha)}
              >
                <Commit data={commit} />
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* {dateGroup.length > 0 && groupTrail.map(({ opacity, y}, index) => (
        <animated.div style={{opacity, y}} key={`${repoName}_${index}`}>
          <p>{ dateGroup[index] }</p>
          <ul> 
            {commitTrail.map(({ opacity, y}, index) => (
              <animated.li style={{opacity, y}} key={commitList[index].id}>
                <Commit data={commitList[index]} />
              </animated.li>
            ))}
          </ul>
        </animated.div>
      ))}  */}

      {/* <ul> 
        {commitList.map((commit, index) => (
          <React.Fragment key={commit.id}>
            {(index === 0 || commitList[index - 1].group !== commit.group )&& (
              <li>
                { commit.group }
              </li>
            )}
            <li 
              {...(detailParams.hash === commit.sha && { className: 'selected' })}
              onClick={() => onClickCommit(repoName, commit.sha)}
            >
              <Commit data={commit} />
            </li>
          </React.Fragment>
        ))}
      </ul> */}
    </div>
  )
};