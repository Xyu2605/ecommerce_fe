import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { AddProductRequest, UpdateProductRequest } from "./dto/product.dto";
import type { IProduct, IProductSection } from "@/interfaces/product.interface";
import axiosInstance from "@/api/axios";
import endpoints from "@/api/endpoints";

export const productService = {

    addProduct : async(data : AddProductRequest) : Promise<IAPIResponse<IProduct>> => {
        const response = await axiosInstance.post(endpoints.PRODUCT_ENDPOINTS.ADD_PRODUCT, data);
        return response.data;
    },
    getProductsByName : async(productName : string) : Promise<IAPIResponse<IProduct[]>> => {
        const response = await axiosInstance.get(endpoints.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_NAME(productName));
        return response.data;
    },
    getProductsByBrand : async(brand : string) : Promise<IAPIResponse<IProduct[]>> => {
        const response = await axiosInstance.get(endpoints.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_BRAND(brand));
        return response.data;
    },
    getProductById : async(productId : number) : Promise<IAPIResponse<IProduct>> => {
        const response = await axiosInstance.get(endpoints.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_ID(productId));
        return response.data;
    },
    findProductByBrandAndName : async(brand : string, name : string) : Promise<IAPIResponse<IProduct[]>> => {
        const response  = await axiosInstance.get(endpoints.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_BRAND_AND_NAME(brand, name));
        return response.data;
    },
    findProductsByCategoryAndBrand : async(category : string, brand : string) : Promise<IAPIResponse<IProduct[]>> => {
        const response = await axiosInstance.get(endpoints.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_CATEGORY_AND_BRAND(category, brand));
        return response.data;
    },
    updateProduct : async(productId : number, data : UpdateProductRequest) : Promise<IAPIResponse<IProduct>> => {
        const response = await axiosInstance.put(endpoints.PRODUCT_ENDPOINTS.UPDATE_PRODUCT(productId), data);
        return response.data;
    },
    deleteProduct : async(productId : number) => {
        await axiosInstance.delete(endpoints.PRODUCT_ENDPOINTS.DELETE_PRODUCT(productId));
    },
    getSectionProductByCategory : async() : Promise<IAPIResponse<IProductSection[]>> => {
        const reponse = await axiosInstance.get(endpoints.PRODUCT_ENDPOINTS.GET_SECTION_PRODUCT_BY_CATEGORIES);
        return reponse.data;
    }
}