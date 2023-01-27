/**
 *设置 sessionStorage
 */
export const setCache = (key: string, value: string) => {
  if (value === undefined || value === null) {
    window.sessionStorage.setItem(key, value);
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * 获取sessionStorage
 */

export const getCache = (key: string) => {
  const sessionStorage = window.sessionStorage.getItem(key);
  if (sessionStorage === 'undefined' || sessionStorage === null) {
    return undefined;
  }
  return JSON.parse(sessionStorage);
};

// 删除sessionStorage
export const removeCache = (key: string) => {
  return window.sessionStorage.removeItem(key);
};

// 清除所有sessionStorage
export const removeAll = () => {
  return window.sessionStorage.clear();
};
