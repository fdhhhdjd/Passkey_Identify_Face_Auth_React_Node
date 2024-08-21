export const clearToken = (key) => {
  return localStorage.removeItem(key);
};

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);

  return JSON.parse(value);
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const clearAllLocalStorage = () => {
  return localStorage.clear();
};
