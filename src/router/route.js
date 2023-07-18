import React from 'react';

import Main from '@/pages/Main';
import Statistics from '@/pages/Statistics';

export const siteMap = [
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