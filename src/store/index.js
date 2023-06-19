import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = set => ({
  cardData: [],
  dispatch: action => set(state => reducer(state, action))
});

const reducer = (_, { type, payload }) => {
  switch (type) {
    case 'UPDATE_CARDS_DATA':
      return { cardData: payload.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)) }
  }
};

const useStore = create(devtools(store));

export default useStore;