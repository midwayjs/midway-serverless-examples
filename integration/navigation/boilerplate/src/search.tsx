import React, { useEffect, useState } from 'react'
import './search.css';

import { getRandomColor, getUserId } from './utils';

export default function Search(props) {
  const [searchText, setSearchText ] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const onChange = (e) => {
    setSearchText(e.target.value); 
  }
  const getHistory = () => {
    const userId = getUserId();
    const history = window.localStorage.getItem('nav_search_history_' + userId);
    if (history) {
      setHistoryList(JSON.parse(history));
    }
  }
  const setHistory = (text) => {
    const userId = getUserId();
    const commonHistory = window.localStorage.getItem('nav_search_history_' + userId);
    let historyList;
    if (commonHistory) {
      historyList = JSON.parse(commonHistory);
    } else {
      historyList = [];
    }
    if (historyList[0] && historyList[0].text === text) {
      return;
    }
    historyList = historyList.slice(0, 50);
    historyList.unshift({ text, time: Date.now()})
    window.localStorage.setItem('nav_search_history_' + userId, JSON.stringify(historyList));
    setHistoryList(historyList);
  }
  useEffect(() => {
    getHistory();
  }, []);
  const handleClickBtn = (search) => {
    const linkList = search.split(':lang:');
    const pure = searchText.replace(/^\s+|\s+$/ig, '');
    let isCn = true;
    if (/[a-z]/i.test(pure)) {
      isCn = false;
    }
    let link = linkList[0];
    if (!isCn && linkList[1]) {
      link = linkList[1];
    }
    const targetLink = link.replace(/\$text/g, pure);
    window.open(targetLink);
    setHistory(pure);
    clearSearchValue();
  }
  const clearSearchValue = () => {
    setSearchText('');
  }
  const clearHistory = () => {
    const userId = getUserId();
    window.localStorage.removeItem('nav_search_history_' + userId);
    setHistoryList([]);
  }
  const onInputKeyUp = e => {
    if (e.key === 'Escape') {
      setSearchText('');
    } if (e.key === 'Enter') {
      handleClickBtn('https://www.google.com/search?q=$text');
    }
  }
  const { sortClassId, classMap } = props;
  return <div className="search">
    <div className="searchInputContainer">
      <input value={searchText} onChange={onChange} onKeyUp={onInputKeyUp} className="searchInput" placeholder="搜索 / 翻译" />
      { searchText && <div className="searchClear" onClick={clearSearchValue} >X</div> }
    </div>
    {
      !searchText && historyList && historyList.length ? <div className="searchHistory">
        {
          historyList.slice(0, 10).map((hist: any) => {
            return <div className="searchHistoryItem" onClick={setSearchText.bind(null, hist.text)}>{ hist.text }</div>
          })
        }
        <div className="searchHistoryClear" onClick={clearHistory}>clear</div>
      </div> : <div />
    }
    {
      searchText && <div >
        <div>
        {
          sortClassId.map((classId: any) => {
            const nav = classMap[classId];
            if (!nav || !nav.searchChilds || !nav.searchChilds.length) {
              return <div />;
            }
            return <div className="searchClassItem">
              <div className="searchClassTitle">{ nav.title }</div>
              <div className="searchItemList">
                {
                  nav.searchChilds.sort((a, b) => {
                    return (b.index || 0) - (a.index || 0);
                  }).map((item: any) => {
                    return <div className="searchItem" onClick={handleClickBtn.bind(null, item.search)}>
                      <div className="searchItemIcon" style={{background: item.icon ? `url('${ item.icon }') center/contain no-repeat`: getRandomColor()}}/>
                      { item.title }
                    </div>
                  }) 
                }
              </div>
            </div>
          })
        }
        </div>
      </div>
    }
  </div>;
}