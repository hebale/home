import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '@/pages/Main';
import Statistics from '@/pages/Statistics';

 const siteMap = {
  Main: {
    title: 'Main',
    path: '/',
    description: 'Main page'
  },
  Statistics: {
    title: 'Statistics',
    path: '/statistics',
    description: 'Statistics page'
  },
}

const Routing = () => {
  return (
    <Routes>
      <Route path={siteMap.Main.path} element={<Main />}/>
      <Route path={siteMap.Statistics.path} element={<Statistics />}/>
    </Routes>
  )
}

export default Routing;