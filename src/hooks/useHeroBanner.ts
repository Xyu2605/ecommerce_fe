import type { IBanner } from "@/interfaces/banner.interface";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_DELAY = 4000;

export function useHeroBanner(banners : IBanner[]){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    const next = useCallback(() => {
        setCurrentIndex(prev => prev === banners.length - 1 ? 0 : prev + 1)
    }, [banners.length]);

    const prev = useCallback(() => {
        setCurrentIndex(prev => prev === 0 ? banners.length - 1 : prev -1)
    }, [banners.length]);

    useEffect(() => {
        if(isPaused || banners.length <= 1) return
        timerRef.current = setTimeout(next, AUTOPLAY_DELAY)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [currentIndex, isPaused, next, banners.length]);


    return {
        currentIndex,
        isPaused,
        next,
        prev,
        pause : () => setIsPaused(true),
        resume: () => setIsPaused(false)
    }

}