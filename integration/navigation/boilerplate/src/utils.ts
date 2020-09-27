export const getLinkHost = link => {
  const url = new URL(link);
  return 'https://statics.dnspod.cn/proxy_favicon/_/favicon?domain=' + url.hostname;
}

export const localCache = async (key, getData) => {
  const cacheKey = 'nav_cache_' + key;
  const storage = window.localStorage.getItem(cacheKey);
  if (storage) {
    const storageJson = JSON.parse(storage);
    if (Date.now() - storageJson.time < 24 * 3600 * 1000) {
      return storageJson.data;
    }
  }
  const data = await getData();
  window.localStorage.setItem(cacheKey, JSON.stringify({
    time: Date.now(),
    data,
  }));
  return data;
}

export const clearCache = (key) => {
  const cacheKey = 'nav_cache_' + key;
  window.localStorage.removeItem(cacheKey);
};

export const colorList = [
  '#d1d1ff',
  '#737373',
  '#ff8c8c',
  '#68e8ad',
  '#e670dd',
  '#b7b7b7',
  '#dece59'
]

export const getRandomColor = () => {
  return colorList[Math.floor(Math.random() * colorList.length)];
}

export const refresh = () => {
  clearCache('class');
  clearCache('list');
  window.location.reload();
}

export const getUserId = () => {
  return window.localStorage.getItem('nav_user');
}

export const setUserId = (userId) => {
  window.localStorage.setItem('nav_user', userId);
}