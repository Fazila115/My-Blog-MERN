import axios from 'axiso';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// getting parsed value sefely
const getParsedValue = (key) => {
    const item = localStorage.getItem(key);
    if(item){
        try{return JSON.parse(item)}
        catch(error){console.log(`Error parsing ${key}`, error); return null;}
    }
    return null;
};

// request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        const token = user?.token;
        if(token){config.headers.Authorization = `Bearer ${token}`}
        return config;
    }
);

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const url = error?.config?.url;

        if(status === 401 && !url.includes('/api/auth/login')){
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;