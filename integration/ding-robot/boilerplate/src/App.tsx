import React, { useState, useEffect } from 'react';
import { getStore, setStore, removeStore } from './utils';
import './app.css';
export default () => {
  const [inputData, setInputData] = useState<any>({});
  const [webHookList, setHookList] = useState([]);
  const getWebHookList = () => {
    const list = getStore();
    setHookList(list);
  }
  const putWebHookList = (hook: string) => {
    setStore(hook);
    getWebHookList();
  }
  const removeWebHookList = (hook: string) => {
    removeStore(hook);
    getWebHookList();
  }

  const onChangeInput = (key: string, e: any) => {
    const value = e.target.value;
    const newData = {
      ...inputData,
      [key]: value
    };
    setInputData(newData);
  }

  const handlerAdd = () => {
    const { newHook } = inputData;
    if (!newHook) {
      return;
    }
    putWebHookList(newHook);
  }

  const handlerSend = () => {
    const { title, content } = inputData;
    if (!webHookList.length) {
      return;
    }
    fetch('./api/send', {
      body: JSON.stringify({
        title,
        content,
        hooks: webHookList
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(res => {
      return res.json();
    }).then(res => {
      console.log('res', res);
    });
  }

  useEffect(() => {
    getWebHookList();
  }, []);
  return <div className="layout">
    <div className="container">
      <div className="head">
        <div className="logo"/>
        Midway 钉钉消息机器人
      </div>
      <div>
        <div className="title">机器人配置</div>
        <div className="line">
          <input placeholder="请输入钉钉机器人webhook" onChange={onChangeInput.bind(null, 'newHook')} />
          <div className="addBtn btn" onClick={handlerAdd}>添加</div>
        </div>
        {
          !webHookList.length && <div>
            <div className="tip">可尝试添加此机器人：https://oapi.dingtalk.com/robot/send?access_token=fb96f9a4cf054976682b19102e5011173bd913b57a3c67ffea649db7ba64ed45</div>
            <div className="tip">添加完成后钉钉搜索 31105443 进群，体验效果。</div>
          </div>
        }
      </div>
      <div>
        {
          webHookList.map(hookItem => {
            return <div className="hookItem" key={hookItem}>
              <div className="hookItemLink">{ hookItem }</div>
              <div className="hookItemRemove btn" onClick={removeWebHookList.bind(null, hookItem)}>X</div>
            </div>
          })
        }
      </div>
      <div>
        <div className="title">发送消息</div>
        <div className="line">
          <input placeholder="请输入标题" onChange={onChangeInput.bind(null, 'title')} />
        </div>
        <div className="line">
          <textarea placeholder="请输入要发送的内容" onChange={onChangeInput.bind(null, 'content')} />
        </div>
        <div className="tip">内容支持Markdown语法</div>
        <div className="sendBtn btn" onClick={handlerSend}>发送</div>
      </div>
      <div className="copy">Powered by <a href="https://github.com/midwayjs/midway/" rel="noopener noreferrer" target="_blank">Midway Serverless</a> </div>
    </div>
    
  </div>
}