import { HeroBanner } from "@/components/HeroBanner";
import { CategoryNav } from "@/features/category/components/CategoryNav";
import { ProductSection } from "@/features/product/components/ProductSection";
import { useProductSection } from "@/hooks/useProductSection";
import type { IBanner } from "@/interfaces/banner.interface";
import { formatPrice } from "@/lib/utils";


const BANNERS: IBanner[] = [
    {
        id: 1,
        productId: 1,
        title: "Leopold FC900R PD",
        subtitle: "Bàn phím cơ cao cấp, switch Cherry MX, build quality xuất sắc",
        imageUrl: "/images/leopold.jpg",
        price: formatPrice(1292992)
    },
    {
        id: 2,
        productId: 2,
        title: "Varmilo VA87M Sakura",
        subtitle: "Thiết kế hoa anh đào độc đáo, switch Varmilo EC",
        imageUrl: "/images/varmilo.jpg",
        price: formatPrice(72637523)
    },
    {
        id: 3,
        productId: 3,
        title: "Keychron K2 Pro",
        subtitle: "Bàn phím cơ không dây, hot-swap, RGB",
        imageUrl: "/images/keychron.jpg",
        price: formatPrice(23523)
    }
]

export default function HomePage() {

    const {sections, loading, error} = useProductSection();

    return (
        <div>
            <CategoryNav/>
            <HeroBanner banners={BANNERS} />
            {loading && (
                <div className="space-y-10">
                    {[...Array(3)].map((_, i) => (
                        <SectionSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-center text-red-500">{error}</p>
            )}

            {/* Sections theo category */}
            {!loading && sections.map(section => (
                <ProductSection
                    key={section.category.id}
                    section={section}
                />
            ))}
        </div>
    );
}

function SectionSkeleton() {
    return (
        <div className="space-y-4">
            <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
                        <div className="h-4 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    )
}