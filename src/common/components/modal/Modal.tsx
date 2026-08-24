import React from "react"
import { XIcon } from "@phosphor-icons/react"

import { useModal } from "@/common/hooks"
import { Button } from "@/common/components/button/Button"

interface Props {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    glass?: boolean
}

export const Modal: React.FC<Props> = ({ children, size = 'md', glass = false }) => {

    const { modalTitle, onCloseModal } = useModal()

    const sizeClass = size !== 'md' ? `modal--${size}` : ''
    const glassClass = glass ? 'modal--glass' : ''
    const modalClasses = ['modal', sizeClass, glassClass].filter(Boolean).join(' ')

    return (
        <div className={modalClasses} onClick={onCloseModal}>
            <div className="modal__card" onClick={(e) => e.stopPropagation()}>
                <header className="modal__header">
                    <h2 className="modal__title">{modalTitle}</h2>
                    <Button
                        variant="icon"
                        onClick={onCloseModal}
                        icon={<XIcon size={20} />}
                        aria-label="Cerrar modal"
                    />
                </header>

                <div className="modal__container">
                    {children}
                </div>
            </div>
        </div>
    )
}