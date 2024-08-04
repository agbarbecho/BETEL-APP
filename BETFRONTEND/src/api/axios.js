import axios from 'axios'

'https://api.mibackend.com/api'
const baseURL = import.meta.env.VITE_BACKEND || 'http://localhost:3000/api';

const client = axios.create ({
    baseURL,
    withCredentials: true,
    
});

export default client;