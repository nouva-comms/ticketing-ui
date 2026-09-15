export const fetchApi = (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      "ngrok-skip-browser-warning": "true",
      ...(options.headers || {}),
    },
  });
};