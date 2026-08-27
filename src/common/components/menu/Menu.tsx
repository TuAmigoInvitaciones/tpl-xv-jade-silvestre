import React from 'react'
import { ListIcon } from '@phosphor-icons/react'

import { Button } from '@/common/components/button/Button'
import { useMenu } from '@/common/hooks'
import type { MenuProps } from '@/common/types'
import { MenuSidebar } from './MenuSidebar'

export const Menu: React.FC<MenuProps> = (props) => {
    const {
        isMenuVisible,
        activeVariant,
        activeTitle,
        activeBtnVariant,
        activeItems,
        onOpenMenu,
    } = useMenu(props)

    if (!isMenuVisible) return null

    return (
        <>
            {activeVariant === 'floating' ? (
                <div className="menu menu--floating">
                    <Button
                        isFloating
                        variant={activeBtnVariant}
                        onClick={onOpenMenu}
                        icon={<ListIcon size={24} />}
                        aria-label="Abrir menú"
                    />
                </div>
            ) : (
                <header className="menu menu--bar">
                    <div className="menu__title">{activeTitle}</div>
                    <Button
                        variant={activeBtnVariant}
                        radius="full"
                        onClick={onOpenMenu}
                        icon={<ListIcon size={24} />}
                        aria-label="Abrir menú"
                        className="menu__btn"
                    />

                </header>
            )}

            <MenuSidebar title={activeTitle} items={activeItems}>
                {props.sidebarChildren}
            </MenuSidebar>
        </>
    )
}
