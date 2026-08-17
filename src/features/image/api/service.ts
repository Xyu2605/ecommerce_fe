import axiosInstance from "@/api/axios";
import endpoints from "@/api/endpoints";
import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { IImage } from "@/interfaces/image.interface";

export const imageService = {
    getImageById : async(imageId : number) : Promise<IAPIResponse<IImage>> => {
        const response = await axiosInstance.get(endpoints.IMAGE_ENDPOINTS.GET_IMAGE_BY_ID(imageId));
        return response.data;
    }
}