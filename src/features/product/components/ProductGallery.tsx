
import type { IImage } from "@/interfaces/image.interface"
import { toPublicImageUrl } from "@/utils/image-url"
import { useState } from "react"

interface ProductGalleryProps {
    images: IImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const mainImage = toPublicImageUrl(images?.[selectedIndex]?.downloadUrl)

    return (
        <div className="space-y-3">
            {/* Main image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <img
                    src={mainImage}
                    alt="Product"
                    className="h-full w-full object-cover transition duration-300"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.png";
                    }}
                />
            </div>

            {/* Thumbnails */}
            {images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                    {images.map((img, index) => (
                        <button
                            key={img.id}
                            onClick={() => setSelectedIndex(index)}
                            className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition
                                ${index === selectedIndex
                                    ? "border-teal-600"
                                    : "border-transparent hover:border-gray-300"
                                }`}
                        >
                            <img
                                src={toPublicImageUrl(img.downloadUrl)}
                                alt=""
                                className="h-full w-full object-cover"
                                onError={(e) => {         
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/placeholder.png";
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}