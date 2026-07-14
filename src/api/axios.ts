import axios from "axios";
import endpoints from "./endpoints";
import { useAuthStore } from "@/store/auth";

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;  // truyền token mới vào
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token!);  //  truyền token mới
        }
    })
    failedQueue = [];
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080',
    timeout: 10000,
    withCredentials: true,  // gửi cookie refreshToken
    headers: {
        "Content-Type": "application/json",
        'x-platform': 'WEB'
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)  // thêm error handler
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            
            // Nếu đang refresh thì queue request lại
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return axiosInstance(originalRequest);
                }).catch((err) => Promise.reject(err))
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axiosInstance.post(
                    endpoints.AUTH_ENPOINTS.REFRESH_TOKEN
                );
                const newAccessToken = response.data.data;

                // Lưu token mới
                useAuthStore.getState().setAccessToken(newAccessToken)

                // Xử lý tất cả request đang chờ
                processQueue(null, newAccessToken)

                // Retry request cũ
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                // Reject tất cả request đang chờ
                processQueue(refreshError, null)

                //
                useAuthStore.getState().logout()
                window.location.href = '/login';

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;  // reset flag
            }
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;