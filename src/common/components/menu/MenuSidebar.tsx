import React from 'react'
import { Link } from 'react-router-dom'
import {
    XIcon,
    EnvelopeSimpleIcon,
    SparkleIcon,
    ArrowRightIcon,
    HeartIcon,
} from '@phosphor-icons/react'

import { useMenu } from '@/common/hooks'
import { Button } from '@/common/components/button/Button'
import { Accordion } from '@/common/components/accordion/Accordion'
import type { MenuSidebarProps, AccordionItem } from '@/common/types'
import logo from '@/assets/images/icons/logo.svg'

const PRIMARY_SECTION_KEYS = ['hero', 'places', 'itinerary', 'presents', 'confirmation']

export const MenuSidebar: React.FC<MenuSidebarProps> = ({
    title = 'Grethel Stefania',
    items = [],
    children,
}) => {
    const { isMenuOpen, onCloseMenu, activeItems, activeTitle } = useMenu()

    const rawSections = items.length > 0 ? items : activeItems

    const importantSections = rawSections
        .filter((item) => {
            const hrefKey = item.href.replace('#', '')
            return PRIMARY_SECTION_KEYS.includes(hrefKey) || items.length > 0
        })
        .slice(0, 5)

    const accordionItems: AccordionItem[] = [
        {
            id: 'envelope',
            title: 'SOBRE VIRTUAL',
            icon: <EnvelopeSimpleIcon size={20} />,
            defaultOpen: false,
            content: (
                <Link
                    to="/envelope"
                    className="menu-sidebar__envelope-link"
                    onClick={onCloseMenu}
                >
                    <span>Abrir Sobre Digital</span>
                    <ArrowRightIcon size={18} />
                </Link>
            ),
        },
        {
            id: 'invitation',
            title: 'SECCIONES',
            icon: <SparkleIcon size={20} />,
            defaultOpen: true,
            content: (
                <ul className="menu-sidebar__list">
                    {importantSections.map((item, index) => (
                        <li key={index} className="menu-sidebar__item">
                            <a
                                href={item.href}
                                className="menu-sidebar__link"
                                onClick={() => {
                                    if (item.onClick) item.onClick()
                                    onCloseMenu()
                                }}
                            >
                                {item.icon && <span className="menu-sidebar__link-icon">{item.icon}</span>}
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            ),
        },
    ]

    const overlayClass = `menu-overlay ${isMenuOpen ? 'menu-overlay--open' : ''}`
    const sidebarClass = `menu-sidebar ${isMenuOpen ? 'menu-sidebar--open' : ''}`
    const headerTitle = activeTitle && activeTitle !== 'Menú' ? activeTitle : title

    return (
        <>
            <div className={overlayClass} onClick={onCloseMenu} aria-hidden="true" />

            <aside className={sidebarClass} aria-label="Menú de navegación">
                <header className="menu-sidebar__header">
                    <h2 className="menu-sidebar__title">{headerTitle}</h2>
                    <Button
                        variant="icon"
                        radius="full"
                        onClick={onCloseMenu}
                        icon={<XIcon size={22} />}
                        aria-label="Cerrar menú"
                    />
                </header>

                <div className="menu-sidebar__content">
                    {/* Logo centrado antes de los acordeones */}
                    <div className="menu-sidebar__centered-logo">
                        <img src={logo} alt="Logo" className="menu-sidebar__logo-img" />
                    </div>

                    {children ? children : <Accordion items={accordionItems} variant="separated" allowMultiple />}
                </div>

                <footer className="menu-sidebar__footer">
                    <div className="menu-sidebar__footer-badge">
                        <HeartIcon size={16} weight="fill" className="menu-sidebar__footer-icon" />
                        <span>¡Te espero en mis XV años!</span>
                    </div>
                </footer>
            </aside>
        </>
    )
}