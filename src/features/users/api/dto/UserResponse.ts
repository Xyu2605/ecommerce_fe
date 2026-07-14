import type { IRole } from "@/interfaces/role.interface";

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: IRole[];
}
