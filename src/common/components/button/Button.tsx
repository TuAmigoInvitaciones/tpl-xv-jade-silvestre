import React from 'react'
import type { ButtonProps } from '@/common/types'

export type { ButtonVariant, ButtonSize, ButtonRadius, ButtonProps } from '@/common/types'

export const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    variant = 'primary',
    isFloating = false,
    size = 'md',
    radius = 'none',
    fullWidth = false,
    icon,
    iconPosition = 'left',
    isLoading = false,
    disabled = false,
    className = '',
    style,
    onClick,
    ...props
}) => {
    const baseClass = 'btn'

    const actualFloating = isFloating
    const actualVariant = variant

    const variantClass = `btn--${actualVariant}`
    const floatingClass = actualFloating ? 'btn--floating' : ''
    const sizeClass = `btn--${size}`

    let radiusClass = ''
    let customRadiusStyle: React.CSSProperties = {}

    const activeRadius = actualFloating ? 'full' : radius

    if (typeof activeRadius === 'string' && ['none', 'sm', 'md', 'lg', 'full'].includes(activeRadius)) {
        radiusClass = `btn--radius-${activeRadius}`
    } else if (typeof activeRadius === 'number') {
        customRadiusStyle = { borderRadius: `${activeRadius}px` }
    } else if (typeof activeRadius === 'string') {
        customRadiusStyle = { borderRadius: activeRadius }
    }

    const fullWidthClass = fullWidth ? 'btn--full-width' : ''
    const loadingClass = isLoading ? 'btn--loading' : ''

    const combinedClassName = [
        baseClass,
        floatingClass,
        variantClass,
        sizeClass,
        radiusClass,
        fullWidthClass,
        loadingClass,
        className
    ].filter(Boolean).join(' ')

    const combinedStyle = {
        ...customRadiusStyle,
        ...style
    }

    return (
        <button
            type={type}
            className={combinedClassName}
            style={combinedStyle}
            disabled={disabled || isLoading}
            onClick={onClick}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="btn__spinner" aria-hidden="true" />
                    {children && <span>{children}</span>}
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="btn__icon">{icon}</span>}
                    {children && <span className="btn__text">{children}</span>}
                    {icon && iconPosition === 'right' && <span className="btn__icon">{icon}</span>}
                </>
            )}
        </button>
    )
}
