import { productService } from "@/features/product/api/service";
import type { IProductSection } from "@/interfaces/product.interface";
import { useEffect, useState } from "react";

export function useProductSection() {
    const [sections, setSections] = useState<IProductSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        productService.getSectionProductByCategory()
            .then(res => setSections(res.data))
            .catch(() => setError("Không thể tải dữ liệu"))
            .finally(() => setLoading(false))
    }, [])
    
    return {sections, loading, error};
}