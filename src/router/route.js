import React from 'react';

import Main from '@/pages/Main';
import Statistics from '@/pages/Statistics';
import Lab from '@/pages/Lab';

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
  },
  {
    title: 'Lab',
    path: '/lab',
    element: <Lab />,
    description: 'Lab page'
  }
];