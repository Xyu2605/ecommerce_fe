import axiosInstance from '@/api/axios'
import endpoints from '@/api/endpoints'
import type { IAPIResponse } from '@/interfaces/api-response.interface'
import type { IUser } from '@/interfaces/user.interface'
import type { RegisterRequest, RegisterResponse } from './dto/register.dto'
import type { LoginRequest, LoginResponse } from './dto/login.dto'
import type { UpdateMeRequest } from './dto/updateMe.dto'
import type { ResetPasswordRequest } from './dto/reset-password.dto'

export const authService = {
    login : async (data : LoginRequest): Promise<IAPIResponse<LoginResponse>> => {
        const response = await axiosInstance.post(endpoints.AUTH_ENDPOINTS.LOGIN, data);
        return response.data;
    },

    logout : async () =>{
        await axiosInstance.post(endpoints.AUTH_ENDPOINTS.LOGOUT);
    },
    
    register : async (data : RegisterRequest): Promise<IAPIResponse<RegisterResponse>> => {
        const response = await axiosInstance.post(endpoints.AUTH_ENDPOINTS.REGISTER, data);
        return response.data;
    },

    forgotPassword: async (email: string) => {
    const response = await axiosInstance.post(
        `${endpoints.AUTH_ENDPOINTS.FORGOT_PASSWORD}?email=${email}`
    )
    return response.data;
    },

    verifyOtp: async (email: string, otp: string) => {
        const response = await axiosInstance.post(
            `${endpoints.AUTH_ENDPOINTS.VERIFY}?email=${email}&otp=${otp}`
        )
        return response.data;
    },

    resetPassword: async (data: ResetPasswordRequest) => {
        const response = await axiosInstance.post(
            endpoints.AUTH_ENDPOINTS.RESET_PASSWORD, data
        )
        return response.data;
    },

    getMe: async (): Promise<IUser> => {
        const response = await axiosInstance.get(endpoints.AUTH_ENDPOINTS.ME);
        return response.data.data;
    },

    updateMe: async (data: UpdateMeRequest): Promise<IUser> => {
        const response = await axiosInstance.put(endpoints.AUTH_ENDPOINTS.UPDATE_ME, data);
        return response.data;
    },
    
    refreshToken: async () => {
        const reponse = await axiosInstance.post(endpoints.AUTH_ENDPOINTS.REFRESH_TOKEN);
        return reponse.data;
    },
}