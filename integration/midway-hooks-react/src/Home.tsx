import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { hello, sendMessage } from './apis/lambda';

export default () => {
  const [message, setMessage] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    hello().then(({ message, method }) => {
      setMessage(message);
      setMethod(method);
    });
  }, []);

  const handleClick = async () => {
    const message = window.prompt('your message') as string;
    const { answer, method } = await sendMessage(message);
    alert(`Response: ${answer}. HTTP Method: ${method}`);
  };

  const isLoading = !message;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{isLoading ? 'Request Hello Function ……' : `Api response: ${message}. HTTP Method: ${method}`}</p>
        <p>
          <button className="send-button" onClick={handleClick}>
            Send Message To Backend
          </button>
        </p>
        <div className="star-container">
          快来给 Midway Serverless Star 一个吧！
          <iframe
            title="star"
            style={{ border: 0 }}
            src="https://ghbtns.com/github-btn.html?user=midwayjs&repo=midway&type=star&count=true&size=large"
            scrolling="0"
            width="150px"
            height="32px"
          />
        </div>
      </header>
    </div>
  );
};
