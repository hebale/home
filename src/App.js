import React, { useEffect } from 'react';

import '@/assets/scss/style';
import Header from '@/layout/Header';
import Body from '@/layout/Body';

import useOctokit from '@/common/octokit';


const App = () => {
  const { getRepositoryLists } = useOctokit();
  
  useEffect(() => {
    getRepositoryLists();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Body />
    </React.Fragment>
  );
};

export default App;