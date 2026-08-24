import React from 'react'
import type { ButtonVariant } from './button.types'

export type MenuVariant = 'floating' | 'bar'

export interface MenuItem {
    label: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
    isExternal?: boolean
}

export interface MenuProps {
    show?: boolean
    variant?: MenuVariant
    buttonVariant?: ButtonVariant
    title?: string
    items?: MenuItem[]
    sidebarChildren?: React.ReactNode
}

export interface MenuSidebarProps {
    title?: string
    items?: MenuItem[]
    children?: React.ReactNode
}
