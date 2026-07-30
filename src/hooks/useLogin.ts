import { authService } from "@/features/auth/api/service";
import { useState } from "react";
import type { IAPIResponse } from "@/interfaces/api-response.interface";
import type { LoginResponse } from "@/features/auth/api/dto/login.dto";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const login = async (data : {email : string ; password : string}): Promise<IAPIResponse<LoginResponse>> =>{
        setLoading(true);
        setError(null);
        try{
            return await authService.login(data);

        } catch (err : any){
            setError(
                err.response?.data?.message ||
                "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu!"
            );
            throw err;
        } finally{
            setLoading(false);
        }
    }
    return {loading, error, login};
}