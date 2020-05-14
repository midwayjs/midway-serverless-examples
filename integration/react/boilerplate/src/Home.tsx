import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './home.css';
export default () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/index')
      .then(resp => resp.json())
      .then(({message}) => setMessage(message))
  }, [])

  const isLoading = !message

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {
            isLoading
              ? 'Request /api/index ……'
              : `FaaS Api Response: ${message}`
          }
        </p>
        <p>
          Edit <code>/apis/index.ts</code> and save to reload
        </p>
        快来给 Midway FaaS Star 一个吧！
        <iframe style={{marginTop: 20, border: 0}}  src="https://ghbtns.com/github-btn.html?user=midwayjs&repo=midway-faas&type=star&count=true&size=large" scrolling="0" width="150px" height="40px"></iframe>
      </header>
    </div>
  );
}