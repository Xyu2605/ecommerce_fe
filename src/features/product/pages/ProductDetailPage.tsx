import { Breadcrumb } from "@/components/Breadcrumb";
import { useProducts } from "@/hooks/useProduct";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useParams } from "react-router-dom";
import { ProductGallery } from "../components/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";

export default function ProductDetailPage() {
    const { id } = useParams<{id: string }>();
    const { product, loading, error } = useProductDetail(Number(id));

    if(loading) return <ProductDetailSkeleton/>
    if(error || !product){
        return(
            <div className="flex min-h-96 items-center justify-center">
                <p className="text-gray-400">{error ?? "Không tìm thấy sản phẩm"}</p>
            </div>
        )
    }
        return (
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-10">
            {/* Breadcrumb */}
            <Breadcrumb items={[
                { label: "Trang chủ", href: "/" },
                { label: product.categoryName?? "Sản phẩm", href: `/products?categoryId=${product.categoryName}` },
                { label: product.name }
            ]} />

            {/* Main content */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                {/* Left — Gallery */}
                <ProductGallery images={product.images} />

                {/* Right — Info */}
                <ProductInfo product={product} />
            </div>

            {/* Tabs */}
            {/* <ProductTabs product={product} /> */}

            {/* Related */}
            {/* <RelatedProducts
                categoryId={product.categoryId}
                excludeId={product.id}
            /> */}
        </div>
    )
}

function ProductDetailSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-6 animate-pulse rounded bg-gray-200 ${i === 0 ? "w-3/4" : i === 2 ? "w-1/3" : "w-full"}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}