import React from 'react';
import { NavLink } from 'react-router-dom';

import { siteMap } from '@/router/route';

export default function Header() {
  return (
    <header>
      <h1>
        <a className="github" href="https://github.com/hebale/home" target="_blank">깃허브</a>
        <a href="/">home</a>
      </h1>
      <nav>
        {siteMap.map(site => (
          <NavLink 
            key={site.title}
            to={site.path}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            { site.title }
          </NavLink>
        ))}
      </nav>
    </header>
  )
};