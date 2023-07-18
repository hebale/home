import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '@/pages/Main';
import Statistics from '@/pages/Statistics';

 const siteMap = [
  {
    title: 'Main',
    path: '/',
    element: <Main />,
    description: 'Main page'
  },
  {
    title: 'Statistics',
    path: '/statistics',
    element: <Statistics />,
    description: 'Statistics page'
  }
];

const Routing = () => {
  return (
    <Routes>
      {siteMap.map(site => (
        <Route key={site.title} path={site.path} element={site.element}/>
      ))}
    </Routes>
  )
}

export default Routing;