import React, { useState } from 'react'
import { getUserId } from './utils';
export default function ClassManager(props) {
  const { onChange, btnText, data: originData } = props;
  const [ data, setData ] = useState(originData || {});
  const [isOpen, setOpen] = useState(false);

  const onInputChange = (type, e) => {
    const v = e.target.value;
    const newData = {
      ...data,
      [type]: v
    }
    setData(newData);
  }
  const onSubmit = () => {
    data.userId = getUserId();
    fetch('./apis/class-add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(() => {
      if (onChange) {
        onChange();
      }
      triggleOpen();
    });
  }
  const triggleOpen = () => {
    setOpen(!isOpen);
  }
  return <div>
    <div className="topBtn" onClick={triggleOpen}>{ btnText || '+ 分类' }</div>
    { isOpen && <div className="model">
      <div className="modelContainer">
        <div className="modelClose" onClick={triggleOpen}>X</div>
        <div className="modelTitle">添加分类</div>
        <div className="line">
          <div className="label">标题</div>
          <input value={data.title} onChange={onInputChange.bind(null, "title")} />
        </div>
        <div className="line">
          <div className="label">排序值</div>
          <input value={data.index} onChange={onInputChange.bind(null, "index")} />
        </div>
        <div className="line">
          排序值小于0时，若此分类中没有链接，将会隐藏分类
        </div>
        <div className="submit" onClick={onSubmit}>确认</div>
      </div>
    </div>}

  </div>;
}