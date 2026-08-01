import { categoryService } from "@/features/category/api/service";
import type { ICategory } from "@/interfaces/category.interface";
import { useEffect, useState } from "react";

export function useCategoryNav() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [activedId, setActiveId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        categoryService.getAll()
            .then(res => setCategories(res.data))
            .catch((err) => {
                setError(err.reponse?.data?.mesage ?? "Không thể tải danh mục");
                setCategories([])
            })
            .finally(() => setLoading(false))
    }, [])

    return {categories, loading, activedId, setActiveId};
}