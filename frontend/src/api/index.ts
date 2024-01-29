import axios from 'axios';
 

const clientAxios = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API || 'http://localhost:3000/api',
});

export default clientAxios;