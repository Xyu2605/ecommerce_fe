import type { IRole } from './role.interface';

export interface IUser{
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    role : IRole[];
}

// export interface IRegisterRequest{
//     firstName : string;
//     lastName : string;
//     email : string;
//     password : string;
//     confirmPassword : string;
// }

// export interface ILoginRequest{
//     email : string;
//     password : string;
// }

// export interface IChangePasswordRequest{
//     oldPassword : string;
//     newPassword : string;
//     confirmPassword : string;
// }

// export interface IResetPasswordRequest{
//     email : string;
//     otp : string;
//     newPassword : string;
//     confirmPassword : string;
// }

// export interface IUpdateUserRequest{
//     firstName : string;
//     lastName : string;
// }