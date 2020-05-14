import React, { useState, useEffect } from 'react';
import './common.css';
export default () => {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('/api/list')
      .then(resp => resp.json())
      .then(({list}) => setList(list))
  }, [])


  return (
    <div className="common-container">
      { list && list.length ? list.map((item: any) => {
        return <div className="common-card">
          <div className="common-title">
            <a href={ `https://www.npmjs.com/package/${item.name}` } target="_blank">{ item.name }</a>
          </div>
          <div>{ item.info }</div>
        </div>;
      }): 'Loading...' }
    </div>
  );
}