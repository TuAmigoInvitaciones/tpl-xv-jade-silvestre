import React from 'react'
import { XIcon } from '@phosphor-icons/react'

import { useMenu } from '@/common/hooks/useMenu'
import { Button } from '@/common/components/button/Button'
import type { MenuSidebarProps } from '@/common/types'

export const MenuSidebar: React.FC<MenuSidebarProps> = ({
    title = 'Menú',
    items = [],
    children,
}) => {
    const { isMenuOpen, onCloseMenu } = useMenu()

    const overlayClass = `menu-overlay ${isMenuOpen ? 'menu-overlay--open' : ''}`
    const sidebarClass = `menu-sidebar ${isMenuOpen ? 'menu-sidebar--open' : ''}`

    return (
        <>
            <div className={overlayClass} onClick={onCloseMenu} aria-hidden="true" />

            <aside className={sidebarClass} aria-label="Menú de navegación">
                <header className="menu-sidebar__header">
                    <h2 className="menu-sidebar__title">{title}</h2>
                    <Button
                        variant="icon"
                        radius="full"
                        onClick={onCloseMenu}
                        icon={<XIcon size={24} />}
                        aria-label="Cerrar menú"
                    />
                </header>

                <div className="menu-sidebar__content">
                    {children ? (
                        children
                    ) : items.length > 0 ? (
                        <ul className="menu-sidebar__list">
                            {items.map((item, index) => (
                                <li key={index} className="menu-sidebar__item">
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                                            onClick={() => {
                                                if (item.onClick) item.onClick()
                                                onCloseMenu()
                                            }}
                                        >
                                            <Button
                                                variant="ghost"
                                                fullWidth
                                                icon={item.icon}
                                                iconPosition="left"
                                                style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                                            >
                                                {item.label}
                                            </Button>
                                        </a>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            fullWidth
                                            icon={item.icon}
                                            iconPosition="left"
                                            style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                                            onClick={() => {
                                                if (item.onClick) item.onClick()
                                                onCloseMenu()
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="menu-sidebar__list">
                            <li className="menu-sidebar__item">
                                <Button
                                    variant="ghost"
                                    fullWidth
                                    style={{ justifyContent: 'flex-start', textAlign: 'left' }}
                                    onClick={onCloseMenu}
                                >
                                    Inicio
                                </Button>
                            </li>
                        </ul>
                    )}
                </div>
            </aside>
        </>
    )
}