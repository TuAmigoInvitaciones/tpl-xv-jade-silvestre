import React from 'react'

export type AccordionVariant = 'bordered' | 'separated' | 'glass'

export interface AccordionItem {
    id: string | number
    title: string
    content: React.ReactNode
    icon?: React.ReactNode
    defaultOpen?: boolean
    disabled?: boolean
}

export interface AccordionProps {
    items?: AccordionItem[]
    allowMultiple?: boolean
    variant?: AccordionVariant
    className?: string
    children?: React.ReactNode
}
