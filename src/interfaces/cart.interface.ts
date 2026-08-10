import type { ICartItem } from "./cart-item.interface";

export interface ICart {
    cartId : number;
    userId : number;
    items : ICartItem[];
    totalAmount : number;
}