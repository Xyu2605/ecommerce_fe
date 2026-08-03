import type { ICategory } from "./category.interface";
import type { IImage } from "./image.interface";

export interface IProduct {
    id : number;
    name : string;
    brand : string;
    price : number;
    inventory : number;
    description? : string;
    category : ICategory;
    images : IImage[];
}

export interface IProductSection {
    category : ICategory;
    products : IProduct[];
}