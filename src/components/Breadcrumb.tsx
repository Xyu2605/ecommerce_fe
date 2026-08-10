import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight size={14} className="text-gray-300" />}
                    {item.href ? (
                        <Link
                            to={item.href}
                            className="hover:text-teal-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    )
}