// pages/ProductPage.tsx
import { useCategoryNav } from "@/hooks/useCategoryNav"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ProductCard } from "../components/ProductCard"
import { useProducts } from "@/hooks/useProduct"

export default function ProductPage() {
    const { products, loading, error } = useProducts()
    const { categories } = useCategoryNav()
    const [searchParams, setSearchParams] = useSearchParams()
    const activeCategoryId = searchParams.get("categoryId")
    const activeSort = searchParams.get("sort") ?? "newest"

    const handleCategoryChange = (categoryId: number | null) => {
        const params = new URLSearchParams(searchParams)
        if (categoryId) {
            params.set("categoryId", String(categoryId))
        } else {
            params.delete("categoryId")
        }
        setSearchParams(params)
    }

    const handleSortChange = (sort: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("sort", sort)
        setSearchParams(params)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">

            {/* Category tabs */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto">
                <CategoryTab
                    label="Tất cả"
                    isActive={!activeCategoryId}
                    onClick={() => handleCategoryChange(null)}
                />
                {categories.map(cat => (
                    <CategoryTab
                        key={cat.id}
                        label={cat.name}
                        isActive={activeCategoryId === String(cat.id)}
                        onClick={() => handleCategoryChange(cat.id)}
                    />
                ))}
            </div>

            {/* Sort + Result count */}
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {loading ? "Đang tải..." : `${products.length} sản phẩm`}
                </p>

                <select
                    value={activeSort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="price_asc">Giá tăng dần</option>
                    <option value="price_desc">Giá giảm dần</option>
                </select>
            </div>

            {/* Error */}
            {error && (
                <p className="text-center text-red-500 py-10">{error}</p>
            )}

            {/* Loading skeleton */}
            {loading && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
                            <div className="h-4 animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
            )}

            {/* Products */}
            {!loading && products.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-gray-400">Không có sản phẩm nào</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

// Category tab component
function CategoryTab({
    label, isActive, onClick
}: {
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all
                ${isActive
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {label}
        </button>
    )
}