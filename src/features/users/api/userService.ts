import axiosInstance from "@/api/axios";
import endpoints from "@/api/endpoints";
import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { IRegisterRequest } from "@/interfaces/user.interface";
import type { UpdateUserRequest } from "./dto/UpdateUserRequest";
import type { UserResponse } from "./dto/UserResponse";

export const userService = {

    getUserById: async (userId: number): Promise<UserResponse> => {
        const response = await axiosInstance.get<IAPIResponse>(
            endpoints.USER_ENDPOINTS.GET_USER_BY_ID(userId)
        );
        return response.data.data as UserResponse;
    },

    getAllUsers: async (): Promise<UserResponse[]> => {
        const response = await axiosInstance.get<IAPIResponse>(
            endpoints.USER_ENDPOINTS.GET_ALL_USER
        );
        return response.data.data as UserResponse[];
    },

    createUser: async (request: IRegisterRequest): Promise<UserResponse> => {
        const response = await axiosInstance.post<IAPIResponse>(
            endpoints.USER_ENDPOINTS.CREATE_USER,
            request
        );
        return response.data.data as UserResponse; 
    },

    updateUser: async (userId: number, request: UpdateUserRequest): Promise<UserResponse> => {
        const response = await axiosInstance.put<IAPIResponse>(
            endpoints.USER_ENDPOINTS.UPDATE_USER(userId),
            request
        );
        return response.data.data as UserResponse;
    },

    deleteUser: async (userId: number): Promise<void> => {
        await axiosInstance.delete(
            endpoints.USER_ENDPOINTS.DELETE_USER(userId)
        );
    },

    getAuthenticatedUser: async (): Promise<UserResponse> => {
        const response = await axiosInstance.get<IAPIResponse>(
            endpoints.USER_ENDPOINTS.PROFILE
        );
        return response.data.data as UserResponse;
    },
};