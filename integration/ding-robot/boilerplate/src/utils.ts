const storeKey = 'midway-ding-webhooks';
export const getStore = () => {
  const storage = window.localStorage.getItem(storeKey);
  if (storage) {
    return JSON.parse(storage);
  }
  return [];
}

export const setStore = (hook: string) => {
  const storage = window.localStorage.getItem(storeKey);
  let list = [];
  if (storage) {
    list = JSON.parse(storage);
  }
  list.push(hook);
  window.localStorage.setItem(storeKey, JSON.stringify(list));
}

export const removeStore = (hook: string) => {
  const storage = window.localStorage.getItem(storeKey);
  let list = [];
  if (storage) {
    list = JSON.parse(storage);
  }
  list = list.filter((innerHook: string) => innerHook !== hook);
  window.localStorage.setItem(storeKey, JSON.stringify(list));
}