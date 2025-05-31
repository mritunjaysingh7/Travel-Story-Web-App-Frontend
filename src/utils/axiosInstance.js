import axios from 'axios'
import { BASE_URL } from './constraints'

const axiosInstance = axios.create({
    baseURL: "https://travel-story-web-app-backend.onrender.com",
    timeout: 10000, // Request timeout in milliseconds
    // withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config)=>{
        // Add authentication token to headers
        const accessToken = localStorage.getItem('token')
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }
        return config;
        
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default axiosInstance
