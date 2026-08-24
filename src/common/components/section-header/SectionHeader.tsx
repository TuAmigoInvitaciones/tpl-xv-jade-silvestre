import React from 'react'

export interface SectionHeaderProps {
    title: string
    pretitle?: string
    subtitle?: string
    icon?: React.ReactNode
    align?: 'center' | 'left' | 'right'
    variant?: 'cursive' | 'uppercase'
    className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    pretitle,
    subtitle,
    icon,
    align = 'center',
    variant = 'cursive',
    className = '',
}) => {
    const alignClass = `section-header--align-${align}`
    const combinedClass = ['section-header', alignClass, className].filter(Boolean).join(' ')
    const pretitleClass = `section-header__pretitle ${variant === 'uppercase' ? 'section-header__pretitle--uppercase' : ''}`

    return (
        <header className={combinedClass}>
            {!!icon && <div className="section-header__icon">{icon}</div>}
            {!!pretitle && <p className={pretitleClass}>{pretitle}</p>}
            <h2 className="section-header__title">{title}</h2>
            {!!subtitle && <p className="section-header__subtitle">{subtitle}</p>}
        </header>
    )
}
