import { useState, useCallback } from 'react'
import type { AccordionProps, AccordionVariant } from '@/common/types'

export const useAccordion = (props?: AccordionProps) => {
    const { items = [], allowMultiple = false, variant = 'bordered' } = props || {}

    const [expandedIds, setExpandedIds] = useState<(string | number)[]>(() => {
        return items.filter((item) => item.defaultOpen).map((item) => item.id)
    })

    const isExpanded = useCallback(
        (id: string | number) => expandedIds.includes(id),
        [expandedIds]
    )

    const toggleItem = useCallback(
        (id: string | number) => {
            setExpandedIds((prev) => {
                if (prev.includes(id)) {
                    return prev.filter((item) => item !== id)
                }
                if (allowMultiple) {
                    return [...prev, id]
                }
                return [id]
            })
        },
        [allowMultiple]
    )

    const activeVariant: AccordionVariant = variant

    return {
        expandedIds,
        isExpanded,
        toggleItem,
        activeVariant,
    }
}
