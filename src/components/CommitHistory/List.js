import React, { useRef, useState, useEffect } from 'react';
import { animated, useSprings } from '@react-spring/web';

import useStore from '@/store';
import useCommits from '@/hooks/useCommits';

import Commit from '@/modules/Commit';

export default function List({ loading, repoName, onLoadingState }) {
  const { commitList } = useStore();
  const { updateCommitDetail } = useCommits();

  const scroll = useRef();
  const [lists, setLists] = useState([]);
  const [hash, setHash] = useState(null);
  
  useEffect(() => {
    if(!loading && commitList.length > 0) {
      scroll.current.scrollTop = 0;
    }
  }, [loading]);

  useEffect(() => {
    if(commitList.length > 0) {
      let lists = [];

      for (let i = 0; i < commitList.length; i++) {
        if (i === 0 || commitList[i-1].group !== commitList[i].group) {
          lists.push({ type: 'date', group: commitList[i].group });
        }
        lists.push({ type: 'commit', ...commitList[i] });
      };

      setLists(lists);
      setHash(commitList[0].sha);
      
      onLoadingState({ list: false });
    };
  }, [commitList]);
  
  const onClickCommit = (repo, hash) => {
    onLoadingState({ detail: true });
    updateCommitDetail({ repo, hash });
    setHash(hash);
  };

  const [listSprings] = useSprings(
    lists.length,
    (i) => ({
      from: { opacity: 0, y: 35 },
      to: { opacity: 1, y: 0 },
      delay: 100 * i,
      reset: true,
      config: {
        mass: 2,
        tension: 260
      }
    }),
    [repoName]
  );

  return (
    <div className={`list${!lists.length || loading ? ' loading' : ''}`}>
      <div ref={scroll} className="inner scroll">
        <ul>
          {listSprings.map(({ opacity, y }, index) => (
            <animated.li
              key={`${repoName}_${index}`}
              style={{ opacity, y }}
              className={`${lists[index].type}${hash === lists[index].sha ? ' selected' : ''}`}
              {...(lists[index].type === 'commit' && { onClick: () => onClickCommit(repoName, lists[index].sha) })}
            >
              <Commit data={lists[index]} />
            </animated.li>
          ))}
        </ul>
      </div>
    </div>
  )
};``