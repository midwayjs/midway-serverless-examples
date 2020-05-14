import React, { useState, useEffect } from 'react';
import './layout.css';
import Home from './Home';
import Detail from './Detail';
import List from './List';
const Routers = [
  'Home', 'Detail', 'List'
];

export default () => {
  const [currentRoute, setRoute] = useState(Routers[0]);

  const renderRouter = () => {
    switch(currentRoute) {
      case 'Detail':
        return <Detail />;
      case 'List':
        return <List />;
      default:
        return <Home />;
    }
  }
  
  return <div className="layout">
    <div className="layout-header">
      {
        Routers.map((router: string) => {
          return <div
            className={`layout-header-btn ${router===currentRoute ? 'layout-header-btn-current': ''}`}
            onClick={setRoute.bind(null, router)}
          >
            { router }
          </div>;
        })
      }
    </div>
    <div>{ renderRouter() }</div>
  </div>
}