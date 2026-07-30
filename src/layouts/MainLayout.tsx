import { Outlet } from "react-router-dom";
import { Header } from "@/components/header/Header";

export function MainLayout() {
    return (
        <div className="min-h-screen bg-zinc-50">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}