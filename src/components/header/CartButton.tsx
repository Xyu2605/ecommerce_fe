import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface CartButtonProps {
    /** Số lượng sản phẩm trong giỏ hàng */
    count?: number;
}

export function CartButton({ count = 0 }: CartButtonProps) {
    return (
        <Link
            to="/cart"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-white/20 active:scale-95"
            aria-label={`Giỏ hàng${count > 0 ? `, ${count} sản phẩm` : ""}`}
        >
            <ShoppingCart
                className="h-5 w-5 text-white transition-transform duration-200 group-hover:scale-110"
                strokeWidth={1.8}
            />

            {/* Badge count */}
            {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm animate-[badge-pop_0.3s_ease-out]">
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </Link>
    );
}