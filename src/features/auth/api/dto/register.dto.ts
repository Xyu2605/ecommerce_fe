import type { IUser } from "@/interfaces/user.interface";

export interface RegisterRequest{

    firstName : string;
    lastName : string;
    email : string;
    password : string;
    confirmPassword : string;
}

export interface RegisterResponse{
    accessToken : string;
    user : IUser;
}