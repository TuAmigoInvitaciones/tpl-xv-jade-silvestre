import React from 'react'
import { CaretDownIcon } from '@phosphor-icons/react'
import { useAccordion } from '@/common/hooks'
import type { AccordionProps } from '@/common/types'

export const Accordion: React.FC<AccordionProps> = (props) => {
    const { items = [], className = '' } = props
    const { isExpanded, toggleItem, activeVariant } = useAccordion(props)

    const accordionClass = `accordion accordion--${activeVariant} ${className}`.trim()

    return (
        <div className={accordionClass}>
            {items.map((item) => {
                const expanded = isExpanded(item.id)
                const itemClass = `accordion__item ${expanded ? 'accordion__item--expanded' : ''} ${item.disabled ? 'accordion__item--disabled' : ''}`.trim()
                const chevronClass = `accordion__chevron ${expanded ? 'accordion__chevron--rotated' : ''}`.trim()
                const contentWrapperClass = `accordion__content-wrapper ${expanded ? 'accordion__content-wrapper--expanded' : ''}`.trim()

                return (
                    <div key={item.id} className={itemClass}>
                        <button
                            type="button"
                            className="accordion__header"
                            onClick={() => !item.disabled && toggleItem(item.id)}
                            aria-expanded={expanded}
                            aria-disabled={item.disabled}
                        >
                            <div className="accordion__title-container">
                                {item.icon && <span className="accordion__icon">{item.icon}</span>}
                                <span>{item.title}</span>
                            </div>
                            <span className={chevronClass}>
                                <CaretDownIcon size={20} weight="bold" />
                            </span>
                        </button>

                        <div className={contentWrapperClass}>
                            <div className="accordion__content-inner">
                                <div className="accordion__body">{item.content}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
