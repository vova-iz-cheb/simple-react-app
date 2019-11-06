import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Nav = () => {
  const login = useSelector(store => store.user.login);

  return (
    <nav className="nav">
      <i className="icon-menu fa-2x nav__toggler"></i>
      <ul className="nav__list">
        <li>
          <NavLink exact to="/" className="nav__link">
            Home
          </NavLink>
        </li>
        {login && (
          <li>
            <NavLink to="/news/create" className="nav__link">
              Create News
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/about" className="nav__link">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
