import type { IProduct } from "@/interfaces/product.interface";
import { formatPrice } from "@/lib/utils";
import { toPublicImageUrl } from "@/utils/image-url";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    product : IProduct;
}

export function ProductCard({product} : ProductCardProps) {
    const navigate = useNavigate();
    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={toPublicImageUrl(product.images?.[0]?.downloadUrl)}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="space-y-2 p-4">

                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {product.brand}
                </p>

                <h3 className="line-clamp-2 h-12 font-medium text-gray-900">
                    {product.name}
                </h3>

                <p className="text-xl font-bold text-[#0BBBB6]">
                    {formatPrice(product.price)}
                </p>

                <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="mt-3 w-full rounded-xl bg-[#0BBBB6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#099E9A]"
                >
                    Xem chi tiết
                </button>

            </div>

        </article>
    );
}