import { authService } from "@/features/auth/api/service";
import type { RegisterRequest, RegisterResponse } from "@/features/auth/api/dto/register.dto";
import type { IAPIResponse } from "@/interfaces/api-response.interface";
import { useState } from "react";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterRequest): Promise<IAPIResponse<RegisterResponse>> => {
        setLoading(true);
        setError(null);

        try {
            return await authService.register(data);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Register failed. Please check your information."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, register };
};