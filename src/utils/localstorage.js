export const checkLocalStorage = (key, defaultValue) =>
  localStorage.getItem(`${key}`)
    ? JSON.parse(localStorage.getItem(`${key}`) || "")
    : defaultValue;

export const setInLocalStorage = (key, payload) =>
  localStorage.setItem(`${key}`, JSON.stringify(payload));
