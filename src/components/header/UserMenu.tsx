import { useAuthStore } from "@/store/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { authService } from "@/features/auth/api/service";
import { useClickOutside } from "@/hooks/useClickOutside";
import toast from "react-hot-toast";
import {
    ChevronDown,
    User,
    Package,
    KeyRound,
    Settings,
    LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function UserMenu() {
    const { isAuthenticated, user } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Click outside → đóng dropdown
    const closeDropdown = useCallback(() => setIsOpen(false), []);
    useClickOutside(dropdownRef, closeDropdown, isOpen);

    const handleLogout = async () => {
        try {
            await authService.logout();
            useAuthStore.getState().logout();
            toast.success("Đăng xuất thành công!");
            navigate("/");
        } catch {
            toast.error("Đăng xuất thất bại!");
        } finally {
            setIsOpen(false);
        }
    };

    // Chưa login
    if (!isAuthenticated) {
        return (
            <Link
                to="/auth/login"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20 active:scale-95"
            >
                <User size={18} strokeWidth={1.8} />
                <span className="hidden sm:inline">Đăng nhập</span>
            </Link>
        );
    }

    // Lấy initials cho avatar
    const initials = `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}`.toUpperCase();

    // Check admin role — role là IRole[], dùng .some() thay vì .includes()
    const isAdmin = user?.role?.some((r) => r.role === "ROLE_ADMIN") ?? false;

    // Đã login
    return (
        <div ref={dropdownRef} className="relative">
            {/* Avatar button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full px-2 py-1.5 transition-all duration-200 hover:bg-white/20 active:scale-95"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {/* Avatar circle with initials */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-xs font-bold text-white ring-2 ring-white/40">
                    {initials || "U"}
                </div>

                <span className="hidden max-w-[120px] truncate text-sm font-medium text-white md:inline">
                    {user?.firstName} {user?.lastName}
                </span>

                <ChevronDown
                    size={16}
                    className={`text-white/80 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl animate-[dropdown-in_0.15s_ease-out]">
                    {/* User info header */}
                    <div className="border-b border-zinc-100 bg-zinc-50/50 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                                {initials || "U"}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-zinc-900">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="truncate text-xs text-zinc-500">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                        <MenuItem
                            icon={User}
                            label="Tài khoản của tôi"
                            onClick={() => {
                                navigate("/profile");
                                setIsOpen(false);
                            }}
                        />
                        <MenuItem
                            icon={Package}
                            label="Đơn hàng của tôi"
                            onClick={() => {
                                navigate("/orders");
                                setIsOpen(false);
                            }}
                        />
                        <MenuItem
                            icon={KeyRound}
                            label="Đổi mật khẩu"
                            onClick={() => {
                                navigate("/change-password");
                                setIsOpen(false);
                            }}
                        />

                        {/* Admin only */}
                        {isAdmin && (
                            <>
                                <div className="my-1.5 border-t border-zinc-100" />
                                <MenuItem
                                    icon={Settings}
                                    label="Quản trị hệ thống"
                                    onClick={() => {
                                        navigate("/admin");
                                        setIsOpen(false);
                                    }}
                                />
                            </>
                        )}

                        <div className="my-1.5 border-t border-zinc-100" />
                        <MenuItem
                            icon={LogOut}
                            label="Đăng xuất"
                            onClick={handleLogout}
                            danger
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// MenuItem component — dùng Lucide icons thay vì emoji
interface MenuItemProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    danger?: boolean;
}

function MenuItem({ icon: Icon, label, onClick, danger = false }: MenuItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm transition-colors duration-150 ${
                danger
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
        >
            <Icon size={18} strokeWidth={1.8} className="shrink-0" />
            {label}
        </button>
    );
}