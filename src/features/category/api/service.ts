import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { AddCategoryRequest, UpdateCagoryRequest } from "./dto/category.dto";
import type { ICategory } from "@/interfaces/category.interface";
import axiosInstance from "@/api/axios";
import endpoints from "@/api/endpoints";

export const categoryService = {
    addCategorty : async(data : AddCategoryRequest) : Promise<IAPIResponse<ICategory>> => {
        const response = await axiosInstance.post(endpoints.CATEGORY_ENDPOINTS.ADD_CATEGORY, data);
        return response.data;
    },
    getAll : async () : Promise<IAPIResponse<ICategory[]>> => {
        const reponse = await axiosInstance.get(endpoints.CATEGORY_ENDPOINTS.GET_ALL);
        return reponse.data;
    },
    getCategoryById : async(categoryId : number) : Promise<IAPIResponse<ICategory>> => {
        const response = await axiosInstance.get(endpoints.CATEGORY_ENDPOINTS.GET_CATEGORY_BY_ID(categoryId));
        return response.data;
    },
    getCategoryByName : async(categoryName : string) : Promise<IAPIResponse<ICategory>> => {
        const response = await axiosInstance.get(endpoints.CATEGORY_ENDPOINTS.GET_CATEGORY_BY_NAME(categoryName));
        return response.data;
    },
    updateCategory : async(categoryId : number, data : UpdateCagoryRequest) : Promise<IAPIResponse<ICategory>> => {
        const response = await axiosInstance.put(endpoints.CATEGORY_ENDPOINTS.UPDATE_CATEGORY(categoryId), data);
        return response.data;
    },
    deleteCategory :async(categoryId : number) => {
        await axiosInstance.delete(endpoints.CATEGORY_ENDPOINTS.DELELE_CATEGORY(categoryId));
    }
}