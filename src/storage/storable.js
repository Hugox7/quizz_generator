export const saveString = (name, item) => window.localStorage.setItem(name, item);
export const saveJSON = (name, item) => window.localStorage.setItem(name, JSON.stringify(item));

export const getString = (name) => window.localStorage.getItem(name);
export const getJSON = (name) => JSON.parse(window.localStorage.getItem(name));

export const remove = (name) => window.localStorage.removeItem(name);
