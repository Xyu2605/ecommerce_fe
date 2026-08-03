// features/home/components/HeroBanner.tsx
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useHeroBanner } from "@/hooks/useHeroBanner"
import type { IBanner } from "@/interfaces/banner.interface";

interface HeroBannerProps {
    banners: IBanner[]
}

export function HeroBanner({ banners }: HeroBannerProps) {
    const navigate = useNavigate()
    const {
        currentIndex,
        next, prev,
        pause, resume
    } = useHeroBanner(banners)

    if (banners.length === 0) return <HeroBannerSkeleton />

    const current = banners[currentIndex];

    return (
    <div className="mx-auto mt-6 w-full max-w-7xl px-4">
        <div
            className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg"
            style={{ height: "520px" }}   // gần hình vuông hơn
            onMouseEnter={pause}
            onMouseLeave={resume}
        >
            {/* Slides */}
            <div className="relative h-full w-full">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            index === currentIndex
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
                        }`}
                    >
                        <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                        <div className="absolute inset-0 flex items-center px-14">
                            <div className="max-w-lg">
                                <h2 className="mb-2 text-4xl font-bold text-white">
                                    {banner.title}
                                </h2>

                                <p className="mb-5 text-gray-300">
                                    {banner.subtitle}
                                </p>

                                {banner.price && (
                                    <p className="mb-6 text-3xl font-bold text-white">
                                        {banner.price}
                                    </p>
                                )}

                                <button
                                    onClick={() =>
                                        navigate(`/products/${banner.productId}`)
                                    }
                                    className="rounded-xl bg-[#0BBBB6] px-7 py-3 text-white transition hover:bg-[#099E9A]"
                                >
                                    Xem sản phẩm →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {banners.length > 1 && (
                <>
                    <SlideButton direction="prev" onClick={prev} />
                    <SlideButton direction="next" onClick={next} />
                </>
            )}
        </div>
    </div>
)
}

// Prev/Next button component
function SlideButton({
    direction,
    onClick
}: {
    direction: "prev" | "next"
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={`absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50
                ${direction === "prev" ? "left-4" : "right-4"}`}
            aria-label={direction === "prev" ? "Previous" : "Next"}
        >
            {direction === "prev"
                ? <ChevronLeft size={20} />
                : <ChevronRight size={20} />
            }
        </button>
    )
}

// ✅ Skeleton loading
function HeroBannerSkeleton() {
    return (
        <div className="h-[420px] animate-pulse rounded-2xl bg-gray-200" />
    )
}