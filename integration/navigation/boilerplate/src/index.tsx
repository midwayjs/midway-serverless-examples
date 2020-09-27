import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { getRandomColor, localCache, refresh, getUserId } from './utils';
import ItemManager from './itemManager';
import ClassManager from './classManager';
import UserManager from './userManager';
import Search from './search';
import './index.css';
import './form.css';

export default function App() {
  const [ classList, setClassList ] = useState([])
  const [ navList, setNavList ] = useState([])
  const userId = getUserId();

  const getClassList = async (userId) => {
    localCache('class', () => {
      return fetch('./apis/class-list?userId=' + userId).then(resp => resp.json()).then(res => res.list);
    }).then(list => {
      setClassList(list);
    });
  };
  const getNavList = (userId) => {
    localCache('list', () => {
      return fetch('./apis/nav-list?userId=' + userId).then(resp => resp.json()).then(res => res.list);
    }).then(list => {
      setNavList(list);
    });
  };
  useEffect(() => {
    getClassList(userId);
    getNavList(userId);
  }, [userId])

  const classMap = {};
  classMap['deleted'] = {
    title: '未归类',
    index: -1,
    childs: [],
    searchChilds: []
  };
  classList.forEach((item: any) => {
    classMap[item.id] = {
      title: item.title,
      index: item.index,
      childs: [],
      searchChilds: []
    }
  });

  navList.forEach((nav: any) => {
    let classItem = classMap[nav.class];
    if (!classItem) {
      classItem = classMap['deleted'];
    }
    if (nav.link && nav.link !== 'null') {
      classItem.childs.push(nav);
    }
    if (nav.search) {
      classItem.searchChilds.push(nav);
    }
  });
  
  const sortClassId = Object.keys(classMap).sort((a, b) => {
    return (classMap[b].index || 0) - (classMap[a].index || 0);
  });
  if (!userId) {
    return <div>
      <UserManager isOpen />
    </div>
  }
  return (
    <div className="App">
      <div>
        <Search sortClassId={sortClassId} classMap={classMap} />
      </div>
      <div>
      {
        sortClassId.map((classId: any) => {
          const nav = classMap[classId];
          if (!nav || (nav.index < 0 && !nav.childs.length)) {
            return <div />;
          }
          return <div className="classItem">
            <div className="classTitle">{ nav.title }<span className="classRank">(排序值：{nav.index})</span></div>
            <div className="navList">
              {
                nav.childs.sort((a, b) => {
                  return (b.index || 0) - (a.index || 0);
                }).map((item: any) => {
                  return <a className="navItem" href={item.link} target="_blank" rel="noopener noreferrer">
                    <div className="navIcon" style={{background: item.icon ? `url('${ item.icon }') center/contain no-repeat`: getRandomColor()}}/>
                    <div className="navTitle">
                      
                      <div className="navTitleText">{ item.title }</div>
                    </div>
                    <div className="navDesc">{ item.desc }</div>
                  </a>
                }) 
              }
            </div>
          </div>
        })
      }
      </div>
      <UserManager userId={userId} />
      <div className="topRight">
        <ItemManager classList={classList} onChange={refresh} />
        <ClassManager onChange={refresh} />
        <div className="topBtn" onClick={refresh}>刷新</div>
      </div>
      <div className="copyright">Powered by <a href="https://github.com/midwayjs/midway" target="_blank" rel="noopener noreferrer">Midway</a></div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);