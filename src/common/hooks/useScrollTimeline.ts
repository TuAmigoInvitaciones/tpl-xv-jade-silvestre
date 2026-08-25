import { useEffect, useRef, useState } from 'react'

interface UseScrollTimelineOptions {
    itemCount: number
    viewportThreshold?: number
}

export const useScrollTimeline = ({ itemCount, viewportThreshold = 0.5 }: UseScrollTimelineOptions) => {
    const gridRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [iconTop, setIconTop] = useState(0)

    const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
        itemRefs.current[index] = el
    }

    useEffect(() => {
        const updateIconPosition = () => {
            if (!gridRef.current || itemCount === 0) return

            const viewportCenter = window.innerHeight * viewportThreshold
            let closestIndex = 0
            let minDistance = Infinity

            itemRefs.current.forEach((el, index) => {
                if (!el) return
                const rect = el.getBoundingClientRect()
                const itemCenter = rect.top + rect.height / 2
                const distance = Math.abs(itemCenter - viewportCenter)

                if (distance < minDistance) {
                    minDistance = distance
                    closestIndex = index
                }
            })

            setActiveIndex(closestIndex)

            const activeEl = itemRefs.current[closestIndex]
            if (activeEl && gridRef.current) {
                const gridRect = gridRef.current.getBoundingClientRect()
                const activeRect = activeEl.getBoundingClientRect()
                const relativeTop = activeRect.top - gridRect.top + activeRect.height / 2
                setIconTop(relativeTop)
            }
        }

        window.addEventListener('scroll', updateIconPosition, { passive: true })
        window.addEventListener('resize', updateIconPosition, { passive: true })
        updateIconPosition()

        return () => {
            window.removeEventListener('scroll', updateIconPosition)
            window.removeEventListener('resize', updateIconPosition)
        }
    }, [itemCount, viewportThreshold])

    return {
        gridRef,
        setItemRef,
        activeIndex,
        iconTop,
    }
}
