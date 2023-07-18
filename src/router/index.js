import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { siteMap } from './route';

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