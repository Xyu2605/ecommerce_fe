export interface AddProductRequest {
    name : string;
    brand : string;
    price : number;
    inventory : number;
    description : string;
    categoryId : number;
}

export interface UpdateProductRequest {
    name : string;
    brand : string;
    description : string;
    categoryId : number;
    price : number;
    inventory : number;
}
