import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "../schemas/registerSchema";
import { useRegister } from "../../../hooks/useRegister";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const { register: registerUser } = useRegister();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        try {

            setIsLoading(true);
            const {confirmPassword, ...request} = data;
            await registerUser(request);

            toast.success("Đăng ký thành công!");
            navigate("/");

        } catch (error: any) {

            const errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="mb-8 flex flex-col items-center lg:hidden">
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-14 w-14 object-contain"
                    />
                </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                    Tạo tài khoản
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                    {/* First Name */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                            Họ
                        </label>
                        <div className="relative">
                            <User
                                size={18}
                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                            />
                            <input
                                {...register("firstName")}
                                placeholder="Nguyễn"
                                className={`w-full rounded-xl border bg-zinc-50 py-3 pl-10 pr-3 text-sm text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 ${
                                    errors.firstName
                                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                        : "border-zinc-200 focus:border-[#0BBBB6] focus:ring-[#0BBBB6]/20"
                                }`}
                            />
                        </div>
                        {errors.firstName && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                            Tên
                        </label>
                        <div className="relative">
                            <User
                                size={18}
                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                            />
                            <input
                                {...register("lastName")}
                                placeholder="Văn A"
                                className={`w-full rounded-xl border bg-zinc-50 py-3 pl-10 pr-3 text-sm text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 ${
                                    errors.lastName
                                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                        : "border-zinc-200 focus:border-[#0BBBB6] focus:ring-[#0BBBB6]/20"
                                }`}
                            />
                        </div>
                        {errors.lastName && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Email
                    </label>
                    <div className="relative">
                        <Mail
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            className={`w-full rounded-xl border bg-zinc-50 py-3 pl-11 pr-4 text-sm text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 ${
                                errors.email
                                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                    : "border-zinc-200 focus:border-[#0BBBB6] focus:ring-[#0BBBB6]/20"
                            }`}
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Mật khẩu
                    </label>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Tối thiểu 8 ký tự"
                            className={`w-full rounded-xl border bg-zinc-50 py-3 pl-11 pr-11 text-sm text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 ${
                                errors.password
                                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                    : "border-zinc-200 focus:border-[#0BBBB6] focus:ring-[#0BBBB6]/20"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-600"
                            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                        Xác nhận mật khẩu
                    </label>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu"
                            className={`w-full rounded-xl border bg-zinc-50 py-3 pl-11 pr-11 text-sm text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 ${
                                errors.confirmPassword
                                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                    : "border-zinc-200 focus:border-[#0BBBB6] focus:ring-[#0BBBB6]/20"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-600"
                            aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0BBBB6] text-sm font-semibold text-white shadow-lg shadow-[#0BBBB6]/25 transition-all duration-200 hover:bg-[#099E9A] hover:shadow-xl hover:shadow-[#0BBBB6]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                    {isLoading ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Đang đăng ký...
                        </>
                    ) : (
                        <>
                            Đăng ký
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </>
                    )}
                </button>
            </form>

            {/* Login link */}
            <p className="mt-8 text-center text-sm text-zinc-500">
                Đã có tài khoản?{" "}
                <Link
                    to="/auth/login"
                    className="font-semibold text-[#0BBBB6] transition-colors hover:text-[#099E9A]"
                >
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}