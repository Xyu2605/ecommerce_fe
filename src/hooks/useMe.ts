import type { UpdateMeRequest } from "@/features/auth/api/dto/updateMe.dto";
import { authService } from "@/features/auth/api/service";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import toast from "react-hot-toast";

export const useMe = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {updateUser} = useAuthStore();
    const user = useAuthStore((state) => state.user);

    // Lấy thông tin user hiện tại
    const getMe = async () => {
        setIsLoading(true);
        setError(null);
        try{
            const respone = await authService.getMe();
            updateUser(respone);
            console.log("check info user ", user);

            return respone;
        } catch(err : any){
            setError(
                err.response?.data?.message || "Tải thông tin người dùng thất bại!"
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const updateMe = async (data : UpdateMeRequest) => {
        setIsLoading(true);
        try{
            const response = await authService.updateMe(data);
            toast.success("Cập nhật hồ sơ thành công.");
            updateUser(response);
            return response;
        } catch (err:any){
            setError(err.response?.data?.message || 
                "Cập nhật hồ sơ thất bại!"
            );
            throw err;
        } finally{
            setIsLoading(false);
        }
        
    }
    return {isLoading, error, user, getMe, updateMe};
}