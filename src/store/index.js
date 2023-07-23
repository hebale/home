import React from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import Http from '@/common/http';

import WeatherCanva from '@/lab/WeatherCanvas';
const blueprints = [
  {
    title: 'weather',
    description: 'weather visual interaction',
    library: 'p5.js',
    contents: <WeatherCanva />
  },
  // {
  //   title: 'weather',
  //   description: 'weather visual interaction',
  //   library: 'p5.js',
  //   contents: <WeatherCanva />
  // }
];

const store = set => ({
  homeData: (async () => {
    const response = await Http.get({ path: '/' });
    return response;
  })(),
  cardData: [],
  languageData: [],
  commitList: [],
  commitDetail: {},
  contributionData: [],
  blueprintData: blueprints,
  dispatch: action => set(state => reducer(state, action))
});

const reducer = (_, { type, payload }) => {
  switch (type) {
    case 'UPDATE_CARD_DATA':
      return { cardData: payload.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)) };
    case 'UPDATE_LANGUAGE_DATA':
      return { languageData: payload };
    case 'UPDATE_COMMIT_LIST':
      return { commitList: payload };
    case 'UPDATE_COMMIT_DETAIL':
      return { commitDetail: payload };
    case 'UPDATE_COMTRIBUTION_DATA':
      return { contributionData: payload };
  }
};

const useStore = create(devtools(store));

export default useStore;