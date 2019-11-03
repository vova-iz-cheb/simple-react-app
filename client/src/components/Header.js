import React from 'react';
import { UserBox } from '../Containers/UserBox';
import { Nav } from './Nav';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <Nav />
          <UserBox />
        </div>
      </div>
    </header>
  );
};
