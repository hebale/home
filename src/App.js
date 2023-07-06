import React from 'react';
import '@/assets/scss/style';

import Header from '@/layout/Header';
import Body from '@/layout/Body';

const App = () => {
  return (
    <main>
      <div className='layout'>
        <Header />
        <Body />
      </div>
    </main>
  );
};

export default App;