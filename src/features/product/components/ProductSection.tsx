import type { IProductSection } from "@/interfaces/product.interface";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
    section: IProductSection;
}

export function ProductSection({ section }: ProductSectionProps) {
    const navigate = useNavigate();

    return (
        <section className="container mx-auto px-6 py-8 space-y-6">
            {/* Category Name */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    {section.category.name}
                </h2>
            </div>

            {/* Products */}
            {section.products.length === 0 ? (
                <p className="text-center text-sm text-gray-400">
                    Chưa có sản phẩm
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {section.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* View All */}
                    <div className="flex justify-center">
                        <button
                            onClick={() =>
                                navigate(`/products?categoryId=${section.category.id}&categoryName=${encodeURIComponent(section.category.name)}`)
                            }
                            className="flex items-center gap-1 rounded-full border border-teal-600 px-5 py-2 text-sm font-medium text-teal-600 transition hover:bg-teal-600 hover:text-white"
                        >
                            Xem tất cả
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}