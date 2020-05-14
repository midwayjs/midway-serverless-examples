import React, { useState, useEffect } from 'react';
import './common.css';
export default () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/detail')
      .then(resp => resp.json())
      .then(({message}) => setMessage(message))
  }, [])


  return (
    <div className="common-container">
      { message || 'Loading...' }
    </div>
  );
}