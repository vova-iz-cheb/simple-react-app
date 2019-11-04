import React, { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
    document.title = 'Simple React App';
  });

  return (
    <div>
      <h1>HOME:</h1>
    </div>
  );
};
