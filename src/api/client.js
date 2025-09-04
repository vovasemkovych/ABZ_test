import axios from 'axios';

const api = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
  headers: { Accept: 'application/json' },
});

// optional: log errors while developing
api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error('API error:', err?.response || err);
    throw err;
  }
);

export default api;
