const storeInSession = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

const lookInSession = (key: string) => {
  return sessionStorage.getItem(key);
};

const removeFromSession = (key: string) => {
  return sessionStorage.removeItem(key);
};

const logOutUser = () => {
  sessionStorage.clean();
};

export { logOutUser, storeInSession, lookInSession, removeFromSession };
