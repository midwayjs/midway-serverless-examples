import React, { useState } from 'react'
import { getUserId } from './utils';
export default function ItemManager(props) {
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
    fetch('./apis/nav-add', {
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
    <div className="topBtn" onClick={triggleOpen}>{ btnText || '+ 链接' }</div>
    { isOpen && <div className="model">
      <div className="modelContainer">
        <div className="modelClose" onClick={triggleOpen}>X</div>
        <div className="modelTitle">添加链接</div>
        <div className="line">
          <div className="label">标题</div>
          <input value={data.title} onChange={onInputChange.bind(null, "title")} />
        </div>
        <div className="line">
          <div className="label">描述</div>
          <input value={data.desc} onChange={onInputChange.bind(null, "desc")} />
        </div>
        <div className="line">
          <div className="label">链接</div>
          <input value={data.link} onChange={onInputChange.bind(null, "link")} />
        </div>
        <div className="line">
          <div className="label">ICON</div>
          <input value={data.icon} onChange={onInputChange.bind(null, "icon")} />
        </div>
        <div className="line">
          <div className="label">搜索链接</div>
          <input value={data.search} onChange={onInputChange.bind(null, "search")} />
        </div>
        <div className="line">
          $text 变量用于替换搜索值，中英匹配使用 :lang: 分隔
        </div>
        <div className="line">
          <div className="label">分类</div>
          <select value={data.class} onChange={onInputChange.bind(null, "class")}>
          <option>---请选择</option>
          {
            props.classList.map(classItem => {
              return <option value={classItem.id}>{ classItem.title }(排序值：{classItem.index})</option>;
            })
          }
          </select>
        </div>
        <div className="submit" onClick={onSubmit}>确认</div>
      </div>
    </div>}

  </div>;
}