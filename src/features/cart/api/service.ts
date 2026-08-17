import axiosInstance from "@/api/axios";
import endpoints from "@/api/endpoints";
import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { ICart } from "@/interfaces/cart.interface";

export const cartService = {
    getCartByUserId : async (): Promise<IAPIResponse<ICart>> => {
        const response = await axiosInstance.get(endpoints.CART_ENDPOINTS.GET_CART_BY_USER_ID);
        return response.data;
    },
    
    addItem: async (productId: number, quantity: number) => {
        const response = await axiosInstance.post(endpoints.CART_ENDPOINTS.ADD_ITEM_TO_CART, null, {
            params: { productId, quantity }
        });
        return response.data;
    }
}