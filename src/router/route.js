import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';

import Main from '@/pages/Main';
import Analysis from '@/pages/Analysis';

 const siteMap = {
  Main: {
    title: 'Main',
    path: '/',
    description: 'Main page'
  },
  Analysis: {
    title: 'Analysis',
    path: '/analysis',
    description: 'Analysis page'
  },
}

const Routing = () => {
  return (
    <Routes>
      <Route path={siteMap.Main.path} element={<Main />}/>
      <Route path={siteMap.Analysis.path} element={<Analysis />}/>
    </Routes>
  )
}

export default Routing;