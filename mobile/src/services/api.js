import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3340',
  baseURL: 'http://192.168.0.4:3340',
});

export default api;
