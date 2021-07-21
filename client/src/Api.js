import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000
});

class UsersApi {
  async getUsers() {
    const response = await server.get('/users');
    return response.data;
  };

  async getUser(id) {
    try {
      const response = await server.get(`users/${id}`);
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };

  async createUser(newUser) {
    try {
      const response = await server.post('/users', newUser);
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };

  // user authentication route
  async login({ email, password }) {
    try {
      const response = await server.post('/users/login', { email, password });
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };

  // private routes:
  async updateUser(id, user, token) {
    try {
      const response = await server.put(`/users/${id}`, user, { headers: { "Authorization": `Bearer ${token}` } });
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };

  async deleteUser(id, token) {
    try {
      const response = await server.delete(`/users/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };

  async getDashboard(token) {
    try {
      const response = await server.get('/dashboard', { headers: { "Authorization": `Bearer ${token}` } });
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };
};

const Api = new UsersApi();

export { Api, server };