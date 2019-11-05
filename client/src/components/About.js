import React, { useEffect } from 'react';

export const About = () => {
  useEffect(() => {
    document.title = 'О приложении';
  }, []);

  return (
    <div>
      <h1>О приложении:</h1>
      <p>На серверной части используются node js, express, mongoose.</p>
      <p>
        На клиентской части используются react, redux, react-router. Все компоненты функциональные и
        используют hooks.
      </p>
    </div>
  );
};
