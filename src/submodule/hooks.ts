import { useEffect, useState } from "react"
import { useThrottledCallback } from 'use-debounce';
import { useMediaQuery } from 'react-responsive'

const THROTTLE_WAIT_TIME = 100

type ScreenSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | '2xl'

interface ScrollPos {
  posX: number
  posY: number
}

export function useScrollPos() {
  const [scrollPos, setScrollPos] = useState<ScrollPos>({ posX: 0, posY: 0 })

  const debounceHandleScroll = useThrottledCallback(() => {
    setScrollPos({ posX: window.scrollX, posY: window.scrollY })
  }, THROTTLE_WAIT_TIME)
  
  useEffect(() => {
    window.addEventListener('scroll', debounceHandleScroll)

    return () => window.removeEventListener('scroll', debounceHandleScroll)
  }, [debounceHandleScroll])

  return { scrollPosX: scrollPos.posX, scrollPosY: scrollPos.posY }
}

export function useIntersection(element: React.RefObject<HTMLElement | null>, rootMargin?: string): boolean {
  const [isVisible, setState] = useState(false);
  
  useEffect(() => {
    if (!element.current) {
      return
    }

    const current = element.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    )

    observer?.observe(current);

    return () => current && observer.unobserve(current);
  }, [element, rootMargin]);

  return isVisible;
};

export function useMediaQuery2XS(): boolean {
  return useMediaQuery({ maxWidth: 480 })
}

export function useMediaQueryXS(): boolean {
  return useMediaQuery({ maxWidth: 640 })
}

export function useMediaQuerySM(): boolean {
  return useMediaQuery({ minWidth: 640, maxWidth: 768 })
}

export function useMediaQueryMD(): boolean {
  return useMediaQuery({ minWidth: 768, maxWidth: 1024 })
}

export function useMediaQueryLG(): boolean {
  return useMediaQuery({ minWidth: 1024, maxWidth: 1536 })
}

export function useMediaQuery2XL(): boolean {
  return useMediaQuery({ minWidth: 1536 })
}

export function useScreenSize(): ScreenSize {
  const isExtraSmall = useMediaQueryXS()
  const isSmall = useMediaQuerySM()
  const isMid = useMediaQueryMD()
  const isLarge = useMediaQueryLG()
  const isTwoExtraLarge = useMediaQuery2XL()

  if (isExtraSmall) {
    return 'xs'
  } else if (isSmall) {
    return 'sm'
  } else if (isMid) {
    return 'md'
  } else if (isLarge) {
    return 'lg'
  } else if (isTwoExtraLarge) {
    return '2xl'
  }

  return 'none'
}