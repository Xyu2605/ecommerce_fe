import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
            <Outlet />
        </div>
    );
}