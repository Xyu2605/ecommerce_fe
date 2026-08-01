import { useCategoryNav } from "@/hooks/useCategoryNav";
import { useNavigate, useSearchParams } from "react-router-dom";

export function CategoryNav() {
    const {categories, loading} = useCategoryNav();
    console.log("Categories:", categories);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const activeCategoryId = searchParams.get("categoryId");

    const handleSelect = (categoryId : number| null) => {
        if (categoryId === null) {
            navigate("/products")
        } else{
            navigate(`/products?categoryId=${categoryId}`)
        }
    }

    if (loading) {
        return (
            <div className="flex gap-2 px-4 py-3">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-8 w-20 animate-pulse rounded-full bg-gray-200"
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl">
                <nav className="flex justify-center items-center gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">

                    <CategoryTab
                        label="Tất cả"
                        isActive={!activeCategoryId}
                        onClick={() => handleSelect(null)}
                    />

                    {categories.map(category => (
                        <CategoryTab
                            key={category.id}
                            label={category.name}
                            isActive={activeCategoryId === String(category.id)}
                            onClick={() => handleSelect(category.id)}
                        />
                    ))}

                </nav>
            </div>
        </div>
    )

}

interface CategoryTabProps {
    label: string
    isActive: boolean
    onClick: () => void
}

function CategoryTab({
    label,
    isActive,
    onClick,
}: CategoryTabProps) {
    return (
        <button
            onClick={onClick}
            className={`
                whitespace-nowrap
                rounded-full
                px-5
                py-2
                text-sm
                font-semibold
                transition-all
                duration-200
                hover:-translate-y-0.5
                ${
                    isActive
                        ? "bg-[#0BBBB6] text-white shadow-md shadow-[#0BBBB6]/30"
                        : "bg-gray-100 text-gray-700 hover:bg-[#0BBBB6]/10 hover:text-[#0BBBB6]"
                }
            `}
        >
            {label}
        </button>
    );
}