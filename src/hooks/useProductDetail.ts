import { productService } from "@/features/product/api/service";
import type { IProduct } from "@/interfaces/product.interface";
import { useEffect, useState } from "react";

export function useProductDetail(id? : number){
    const [product, setProduct] = useState<IProduct|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        if(!id){
            return;
        }

        setLoading(true)
        setError(null)
        productService.getProductById(id)
            .then(res => {
                setProduct(res.data)
            })
            .catch(err => {
                setError(err.response?.data?.message || "Không thể tải thông tin sản phẩm!")
            })
            .finally(() => {
                setLoading(false)
            })
                    
    }, [id]);

    return {product, error, loading};
}