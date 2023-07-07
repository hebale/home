import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>
        <a className="github" href="https://github.com/hebale/home" target="_blank">깃허브</a>
        <a href="/">home</a>
      </h1>
      <nav>
        {['main', 'statistics'].map(path => (
          <NavLink 
            key={path}
            to={`/${path === 'main' ? '' : path}`}
            className={({ isActive }) => isActive ? "active" : ""}
          >
            { path }
          </NavLink>
        ))}
      </nav>
    </header>
  )
};