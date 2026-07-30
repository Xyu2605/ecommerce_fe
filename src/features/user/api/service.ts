import axiosInstance from "@/api/axios";
import endpoints from "@/api/endpoints";
import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { UpdateUserRequest } from "./dto/UpdateUserRequest";
import type { UserResponse } from "./dto/UserResponse";

export const userService = {
    getUserById: async (userId: number): Promise<IAPIResponse<UserResponse>> => {
        const response = await axiosInstance.get<IAPIResponse<UserResponse>>(
            endpoints.USER_ENDPOINTS.GET_USER_BY_ID(userId)
        );
        return response.data;
    },

    getAllUsers: async (): Promise<UserResponse[]> => {
        const response = await axiosInstance.get<IAPIResponse<UserResponse[]>>(
            endpoints.USER_ENDPOINTS.GET_ALL_USER
        );
        return response.data.data;
    },

    updateUser: async (userId: number, request: UpdateUserRequest): Promise<UserResponse> => {
        const response = await axiosInstance.put<IAPIResponse<UserResponse>>(
            endpoints.USER_ENDPOINTS.UPDATE_USER(userId),
            request
        );
        return response.data.data;
    },

    deleteUser: async (userId: number): Promise<void> => {
        await axiosInstance.delete(
            endpoints.USER_ENDPOINTS.DELETE_USER(userId)
        );
    },

    getAuthenticatedUser: async (): Promise<UserResponse> => {
        const response = await axiosInstance.get<IAPIResponse<UserResponse>>(
            endpoints.USER_ENDPOINTS.PROFILE
        );
        return response.data.data;
    },
};