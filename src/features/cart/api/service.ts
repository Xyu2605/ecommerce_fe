import axiosInstance from "@/api/axios";
import endpoints from "@/api/endpoints";
import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { ICart } from "@/interfaces/cart.interface";
import type { AddItemToCartRequest } from "./dto/cart.dto";

export const cartService = {
    getCartByUserId : async (): Promise<IAPIResponse<ICart>> => {
        const response = await axiosInstance.get(endpoints.CART_ENDPOINTS.GET_CART_BY_USER_ID);
        return response.data;
    },
    
    addItemToCart : async (data : AddItemToCartRequest) : Promise<IAPIResponse<ICart>> => {
        const response = await axiosInstance.post(endpoints.CART_ENDPOINTS.ADD_ITEM_TO_CART, null,
                        {params : { productId : data.productId, quantity : data.quantity}});
        return response.data;
    }
}