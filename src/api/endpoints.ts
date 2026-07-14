export default{
    AUTH_ENPOINTS: {
        REFRESH_TOKEN: "/api/v1/auth/refresh-token",
        LOGIN: "/api/v1/auth/login",
        LOGOUT: "/api/v1/auth/logout",
        REGISTER: "/api/v1/auth/register",
        FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
        RESET_PASSWORD: "/api/v1/auth/reset-password",

    },
    USER_ENDPOINTS: {
        PROFILE: "/api/v1/user/profile",
        GET_ALL_USER: "/api/v1/users",
        GET_USER_BY_ID: (id: number) => `/api/v1/users/${id}/user`,
        UPDATE_USER: (id: number) => `/api/v1/users/${id}/update`,
        DELETE_USER: (id: number) => `/api/v1/users/${id}/delete`,
    },
    ROLE_ENDPOINTS: {
        GET_ALL: "api/v1/roles/all",
        UPDATE_ROLE: "/api/v1/roles/role/update",
        CREATE_ROLE: "/api/v1/roles/role/create",
        DELETE_ROLE: (id : number) => `/api/v1/roles/role/${id}`,
        GET_ROLE_BY_ID: "/api/v1/role",
    },
    PRODUCT_ENDPOINTS: {
        GET_ALL: "/api/v1/products/all",
        ADD_PRODUCT: "/api/v1/products/add",
        GET_PRODUCT_BY_ID: (id : number) => `/api/v1/products/product/${id}/product`,
        GET_PRODUCT_BY_NAME: (name : string) => `/api/v1/products/product/by/name?name=${encodeURIComponent(name)}`,
        GET_PRODUCT_BY_BRAND: (brand : string) => `/api/v1/products/product/by/brand?brand=${encodeURIComponent(brand)}`,
        GET_PRODUCT_BY_BRAND_AND_NAME: (brand : string, name : string) => `/api/v1/products/product/by/brand-and-name?brand=${encodeURIComponent(brand)}&name=${encodeURIComponent(name)}`,
        GET_PRODUCT_BY_CATEGORY_AND_BRAND: (category : string, brand : string) => `/api/v1/products/product/by/category-and-brand?category=${encodeURIComponent(category)}&brand=${encodeURIComponent(brand)}`,
        UPDATE_PRODUCT: (id : number) => `/api/v1/products/product/${id}/update`,
        DELETE_PRODUCT: (id : number) => `/api/v1/products/product/${id}/delete`,
        
    },
    IMAGE_ENDPOINTS: {
        
    }


} as const