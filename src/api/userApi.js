import api from './client';

// GET /users?page=1&count=6 (newest first by API default)
export async function getUsers({ page = 1, count = 6 } = {}) {
  const { data } = await api.get('/users', { params: { page, count } });
  // expected shape: { success, page, total_pages, total_users, users: [...] }
  return data;
}

// GET /positions -> for radio buttons
export async function getPositions() {
  const { data } = await api.get('/positions');
  // expected: { success, positions: [{id, name}, ...] }
  return data;
}

// GET /token -> required to POST /users
export async function getToken() {
  const { data } = await api.get('/token');
  // expected: { success, token: "..." }
  return data;
}

// POST /users (multipart/form-data)
// payload: { name, email, phone, position_id, photo(File) }
export async function createUser(formPayload) {
  const form = new FormData();
  Object.entries(formPayload).forEach(([k, v]) => form.append(k, v));

  const { token } = await getToken(); // always fetch a fresh token (recommended)
  const { data } = await api.post('/users', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Token: token,
    },
  });
  return data; // { success, user_id, message }
}
