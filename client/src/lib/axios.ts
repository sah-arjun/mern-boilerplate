import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444/api', // your Express backend
  withCredentials: true, // allow sending HTTP-only cookies
});

export default instance;
