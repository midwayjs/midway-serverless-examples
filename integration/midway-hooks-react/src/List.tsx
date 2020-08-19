import React, { useState, useEffect } from 'react';
import { getList } from './apis/lambda';

export default () => {
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    getList().then(({ list }) => setList(list));
  }, []);

  return (
    <div className="common-container">
      {list?.length
        ? list.map((item: any) => {
            return (
              <div className="common-card">
                <div className="common-title">
                  <a href={`https://www.npmjs.com/package/${item.name}`} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </div>
                <div>{item.info}</div>
              </div>
            );
          })
        : 'Loading...'}
    </div>
  );
};
