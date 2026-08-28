import React from 'react'
import { Link } from 'react-router-dom'
import {
    XIcon,
    EnvelopeSimpleIcon,
    ArrowRightIcon,
    HeartIcon,
    HouseIcon,
    MapPinIcon,
    ClockIcon,
    GiftIcon,
    CheckCircleIcon,
} from '@phosphor-icons/react'

import { useMenu } from '@/common/hooks'
import { Button } from '@/common/components/button/Button'
import { Accordion } from '@/common/components/accordion/Accordion'
import type { MenuSidebarProps, AccordionItem } from '@/common/types'
import logo from '@/assets/images/icons/logo.svg'

interface SectionItem {
    label: string
    href: string
    icon: React.ReactNode
    onClick?: () => void
}

const DEFAULT_SECTIONS: SectionItem[] = [
    { label: 'Inicio', href: '#hero', icon: <HouseIcon size={20} /> },
    { label: 'Ubicación', href: '#places', icon: <MapPinIcon size={20} /> },
    { label: 'Itinerario', href: '#itinerary', icon: <ClockIcon size={20} /> },
    { label: 'Mesa de Regalos', href: '#presents', icon: <GiftIcon size={20} /> },
    { label: 'Confirmar Asistencia', href: '#confirmation', icon: <CheckCircleIcon size={20} /> },
]

export const MenuSidebar: React.FC<MenuSidebarProps> = ({
    title = 'Grethel Stefania',
    items = [],
    children,
}) => {
    const { isMenuOpen, onCloseMenu, activeTitle } = useMenu()

    const importantSections = React.useMemo(() => {
        if (items && items.length > 0 && items.length <= 5) {
            return items.map((item) => ({
                ...item,
                icon: item.icon || DEFAULT_SECTIONS.find(d => (item.href || '').includes(d.href.replace('#', '')))?.icon || <HouseIcon size={20} />
            }))
        }
        return DEFAULT_SECTIONS
    }, [items])

    const envelopeAccordionItem: AccordionItem[] = [
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
                    {/* Logo centrado */}
                    <div className="menu-sidebar__centered-logo">
                        <img src={logo} alt="Logo" className="menu-sidebar__logo-img" />
                    </div>

                    {/* Acordeón únicamente para el Sobre Virtual */}
                    <div className="menu-sidebar__envelope-accordion-wrapper">
                        <Accordion items={envelopeAccordionItem} variant="separated" allowMultiple />
                    </div>

                    {/* Secciones directas con íconos */}
                    {children ? (
                        children
                    ) : (
                        <div className="menu-sidebar__sections-direct">
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
                                            <span className="menu-sidebar__link-icon">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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