import React, { useState } from 'react';
import Home from './Home';
import List from './List';

const Routers = ['Home', 'List'];

export default () => {
  const [currentRoute, setRoute] = useState(Routers[0]);

  const renderRouter = () => {
    switch (currentRoute) {
      case 'List':
        return <List />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="layout">
      <div className="layout-header">
        {Routers.map((router) => {
          return (
            <div
              className={`layout-header-btn ${router === currentRoute ? 'layout-header-btn-current' : ''}`}
              onClick={setRoute.bind(null, router)}
            >
              {router}
            </div>
          );
        })}
      </div>
      <div>{renderRouter()}</div>
    </div>
  );
};
