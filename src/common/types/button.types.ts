import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'glass' | 'icon' | 'floating'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    radius?: ButtonRadius
    isFloating?: boolean
    fullWidth?: boolean
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
    isLoading?: boolean
    children?: React.ReactNode
}
