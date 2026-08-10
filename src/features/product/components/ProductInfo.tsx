// features/product/components/ProductInfo.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, Zap, Minus, Plus } from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { formatPrice } from "@/lib/utils"
import toast from "react-hot-toast"
import type { IProduct } from "@/interfaces/product.interface"
import { cartService } from "@/features/cart/api/service"

interface ProductInfoProps {
    product: IProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const { isAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    const isOutOfStock = product.inventory === 0
    const maxQuantity = product.inventory

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.min(Math.max(1, prev + delta), maxQuantity))
    }

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error("Vui lòng đăng nhập!")
            navigate("/auth/login")
            return
        }

        try {
            setIsAddingToCart(true)
            await cartService.addItemToCart(product.id, quantity)
            toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ!`)
        } catch {
            toast.error("Thêm vào giỏ thất bại!")
        } finally {
            setIsAddingToCart(false)
        }
    }

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            toast.error("Vui lòng đăng nhập!")
            navigate("/auth/login")
            return
        }
        await handleAddToCart()
        navigate("/cart")
    }

    return (
        <div className="space-y-5">
            {/* Brand */}
            <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                {product.brand}
            </p>

            {/* Name */}
            <h1 className="text-2xl font-semibold text-gray-900">
                {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-teal-600">
                    {formatPrice(product.price)}
                </span>
            </div>

            {/* Inventory */}
            <p className={`text-sm ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
                {isOutOfStock ? "Hết hàng" : `Còn ${product.inventory} sản phẩm`}
            </p>

            {/* Quantity */}
            {!isOutOfStock && (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Số lượng:</span>
                    <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="min-w-10 text-center text-sm font-medium">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= maxQuantity}
                            className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isAddingToCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-teal-600 py-3 text-sm font-medium text-teal-600 transition hover:bg-teal-50 disabled:opacity-50"
                >
                    {isAddingToCart
                        ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
                        : <ShoppingCart size={18} />
                    }
                    Thêm vào giỏ
                </button>

                <button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-50"
                >
                    <Zap size={18} />
                    Mua ngay
                </button>
            </div>
        </div>
    )
}