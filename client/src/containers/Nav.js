import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Nav = () => {
  const login = useSelector(store => store.user.login);

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        {login && (
          <li>
            <NavLink to="/news/create">Create News</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};
