export interface MeRequest {
    id : number;
    email : string;
    password : string;
}

export interface MeResponse {
    data: {
        id: string;
        email: string;
        password: string;
    }
}