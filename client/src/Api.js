import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000
});


class Api {
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
      const response = await server.put(`/users/${id}`, user, token);
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };

  async deleteUser(id, token) {
    try {
      const response = await server.delete(`/users/${id}`, null, token);
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };

  async getDashboard(token) {
    try {
      const response = await server.get('/dashboard', null, token);
      return response.data;
    } catch (err) {
      return { error: { status: err.response.status, message: err.response.data.error } };
    }
  };
};

export default new Api();