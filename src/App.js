import React, { useState, useEffect, useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import '@/assets/scss/style';

import { debounce } from '@/common/util';

import Header from '@/layout/Header';
import Body from '@/layout/Body';

const App = () => {
  const [isPc, setIsPc] = useState();

  useEffect(() => {
    window.addEventListener('resize', onResizeWindow);
    return () => {
      window.removeEventListener('resize', onResizeWindow);
    };
  }, [])
  
  const onResizeWindow = debounce(() => {
    setIsPc(!isMobile && window.innerWidth >= 1200);
  }, 400);
  
  return (
    <main className={ isPc ? "pc" : "mobile" }>
      <div className='layout'>
        <Header />
        <Body />
      </div>
    </main>
  );
};

export default App;