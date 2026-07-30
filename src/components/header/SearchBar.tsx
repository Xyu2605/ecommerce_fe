import { useNavigate } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDebounce } from "@/hooks/useDebounce";
import type { IProduct } from "@/interfaces/product.interface";

export function SearchBar() {
    const [keyword, setKeyword] = useState("")
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [isSearching, setIsSearching] = useState(false)

    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    // Dùng useDebounce thay vì debounceRef
    const debouncedKeyword = useDebounce(keyword, 400)

    // Click outside → đóng suggestions
    const closeSuggestions = useCallback(() => setShowSuggestions(false), [])
    useClickOutside(wrapperRef, closeSuggestions, showSuggestions)

    // Gọi API khi debouncedKeyword thay đổi
    useEffect(() => {
        if (!debouncedKeyword.trim()) {
            setSuggestions([])
            setShowSuggestions(false)
            return
        }

        const fetchSuggestions = async () => {
            setIsSearching(true)
            try {
                const res = await productService.getByName(debouncedKeyword);
                const names = res.data
                    .map((p: IProduct) => p.name)
                    .slice(0, 5)
                setSuggestions(names)
                setShowSuggestions(names.length > 0)
            } catch {
                setSuggestions([])
            } finally {
                setIsSearching(false)
            }
        }

        fetchSuggestions()
    }, [debouncedKeyword])

    const handleChange = (value: string) => {
        setKeyword(value)
        setActiveIndex(-1)
        if (!value.trim()) {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!keyword.trim()) return
        setShowSuggestions(false)
        navigate(`/search?q=${encodeURIComponent(keyword.trim())}`)
    }

    const handleSelectSuggestion = (name: string) => {
        setKeyword(name)
        setShowSuggestions(false)
        navigate(`/search?q=${encodeURIComponent(name)}`)
    }

    const handleClear = () => {
        setKeyword("")
        setSuggestions([])
        setShowSuggestions(false)
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setShowSuggestions(false)
            inputRef.current?.blur()
            return
        }

        if (!showSuggestions || suggestions.length === 0) return

        if (e.key === "ArrowDown") {
            e.preventDefault()
            setActiveIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0)
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setActiveIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1)
        } else if (e.key === "Enter" && activeIndex >= 0) {
            e.preventDefault()
            handleSelectSuggestion(suggestions[activeIndex])
        }
    }

    return (
        <div ref={wrapperRef} className="relative w-full">
            <form onSubmit={handleSubmit} className="flex">
                <div className="relative flex-1">
                    {/* ✅ Loading spinner hoặc search icon */}
                    {isSearching ? (
                        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-teal-600" />
                        </div>
                    ) : (
                        <Search
                            size={18}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                    )}

                    <input
                        ref={inputRef}
                        value={keyword}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm sản phẩm..."
                        className="w-full rounded-l-xl border border-white/50 bg-white/90 py-2.5 pl-10 pr-10 text-sm text-zinc-800 placeholder-zinc-400 outline-none backdrop-blur-sm transition-all duration-200 focus:border-white focus:bg-white focus:shadow-md"
                    />

                    {keyword && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                            aria-label="Xóa từ khóa"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className="rounded-r-xl border border-l-0 border-white/50 bg-teal-700 px-4 text-white transition-colors duration-200 hover:bg-teal-800 active:bg-teal-900"
                    aria-label="Tìm kiếm"
                >
                    <Search size={18} />
                </button>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl">
                    {suggestions.map((name, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelectSuggestion(name)}
                            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                                index === activeIndex
                                    ? "bg-teal-50 text-teal-800"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                            }`}
                        >
                            <Search size={14} className="shrink-0 text-zinc-400" />
                            <span className="truncate">{name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}