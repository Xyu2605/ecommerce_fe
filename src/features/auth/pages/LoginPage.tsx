import { useLogin } from "@/hooks/useLogin";
import { useMe } from "@/hooks/useMe";
import { useAuthStore } from "@/store/auth";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useLogin();
    const { getMe } = useMe();

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await login({ email, password });
            useAuthStore.setState({ accessToken: response.data.accessToken });
            const user = await getMe();
            console.log("ME =", user);
            toast.success("Đăng nhập thành công");
            useAuthStore.setState({
                isAuthenticated: true,
                accessToken: response.data.accessToken,
                user,
            });
            navigate("/");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập của bạn."
            );
        } finally {
            setIsSubmitting(false);
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
                    Đăng nhập
                </h1>
            </div>

            {/* Error message */}
            {error && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <span className="mt-0.5 shrink-0">⚠</span>
                    <span>{error}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                        Email
                    </label>
                    <div className="relative">
                        <Mail
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-sm text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-[#0BBBB6] focus:bg-white focus:ring-2 focus:ring-[#0BBBB6]/20"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-700">
                            Mật khẩu
                        </label>
                        <Link
                            to="/auth/forgot-password"
                            className="text-xs font-medium text-[#0BBBB6] transition-colors hover:text-[#099E9A]"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-11 text-sm text-zinc-800 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-[#0BBBB6] focus:bg-white focus:ring-2 focus:ring-[#0BBBB6]/20"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-600"
                            aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                        >
                            {showPassword ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0BBBB6] text-sm font-semibold text-white shadow-lg shadow-[#0BBBB6]/25 transition-all duration-200 hover:bg-[#099E9A] hover:shadow-xl hover:shadow-[#0BBBB6]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                    {isSubmitting ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Đang đăng nhập...
                        </>
                    ) : (
                        <>
                            Đăng nhập
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                        </>
                    )}
                </button>
            </form>

            {/* Register link */}
            <p className="mt-8 text-center text-sm text-zinc-500">
                Chưa có tài khoản?{" "}
                <Link
                    to="/auth/register"
                    className="font-semibold text-[#0BBBB6] transition-colors hover:text-[#099E9A]"
                >
                    Đăng ký ngay
                </Link>
            </p>
        </div>
    );
}