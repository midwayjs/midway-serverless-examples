import React, { useState } from 'react'
import { setUserId, refresh } from './utils';
export default function ClassManager(props) {
  const { userId, isOpen: originOpen } = props;
  const [ data, setData ] = useState<any>({});
  const [isOpen, setOpen] = useState(originOpen || false);

  const onInputChange = (type, e) => {
    const v = e.target.value;
    const newData = {
      ...data,
      [type]: v
    }
    setData(newData);
  }
  const onSubmit = () => {
    const newUserId = data.userId || userId;
    if (!newUserId) {
      return;
    }
    if (newUserId === userId) {
      triggleOpen();
      return;
    }
    setUserId(newUserId);
    refresh();
  }
  const triggleOpen = () => {
    setOpen(!isOpen);
  }

  const asTourist = () => {
    setUserId('Tourist');
    refresh();
  }
  return <div>
    { isOpen ? <div className="model">
      <div className="modelContainer">
        <div className="modelClose" onClick={triggleOpen}>X</div>
        <div className="modelTitle">设置用户Id</div>
        <div className="line">
          <div className="label">用户名</div>
          <input value={data.userId || userId} onChange={onInputChange.bind(null, "userId")} />
        </div>
        <div className="line" style={{cursor: 'pointer'}} onClick={asTourist}>使用游客身份访问</div>
        <div className="submit" onClick={onSubmit}>确认</div>
      </div>
    </div> : <div className="userId" onClick={triggleOpen}>{ userId || '设置用户Id' }</div>}
  </div>;
}