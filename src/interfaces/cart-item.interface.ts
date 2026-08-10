import type { IProduct } from "./product.interface";

export interface ICartItem {
    itemId : number;
    quantity : number;
    initPrice : number;
    product : IProduct;
}
