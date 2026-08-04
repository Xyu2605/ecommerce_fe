
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import type { IProduct } from "@/interfaces/product.interface"
import { productService } from "@/features/product/api/service"

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [searchParams] = useSearchParams()

    const categoryId = searchParams.get("categoryId")
    const brand = searchParams.get("brand")
    const name = searchParams.get("name")
    const sort = searchParams.get("sort")

    useEffect(() => {
        setLoading(true)

        productService.getAll({
            categoryId: categoryId ? Number(categoryId) : undefined,
            brand: brand ?? undefined,
            name: name ?? undefined,
            sort: sort ?? undefined,
        })
            .then(res => setProducts(res.data))
            .catch(() => setError("Không thể tải sản phẩm"))
            .finally(() => setLoading(false))

    }, [categoryId, brand, name, sort])

    return { products, loading, error }
}