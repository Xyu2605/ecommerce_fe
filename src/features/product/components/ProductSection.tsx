import type { IProductSection } from "@/interfaces/product.interface";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
    section : IProductSection;
}

export function ProductSection({section}: ProductSectionProps) {
    const navigate = useNavigate();

    return  (
        <section>
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                    {section.category.name}
                </h2>
                <button
                    onClick={() => navigate(`/products?categoryId=${section.category.id}`)}
                    className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                >
                    Xem tất cả
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Products grid */}
            {section.products.length === 0 ? (
                <p className="text-sm text-gray-400">Chưa có sản phẩm</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {section.products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}