import { CartButton } from "./CartButton";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-teal-600/30 bg-[#0BBBB6] shadow-lg shadow-teal-900/10">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                {/* Logo */}
                <Logo />

                {/* Search — ẩn trên mobile nhỏ */}
                <div className="hidden flex-1 sm:block sm:max-w-xl sm:mx-8">
                    <SearchBar />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <CartButton />
                    <UserMenu />
                </div>
            </div>

            {/* Search bar mobile — hiện trên màn hình nhỏ */}
            <div className="border-t border-teal-600/20 px-4 py-2 sm:hidden">
                <SearchBar />
            </div>
        </header>
    );
}
