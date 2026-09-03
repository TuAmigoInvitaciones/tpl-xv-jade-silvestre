import React from 'react'
import { CalendarBlankIcon, MapPinIcon } from '@phosphor-icons/react'
import { useInvitationConfig } from '@/common/hooks'

export const TicketHeader: React.FC = () => {
    const { sections } = useInvitationConfig()
    const heroConfig = sections.hero
    const placesConfig = sections.places

    const title = heroConfig?.names || heroConfig?.title || ''
    const subtitle = heroConfig?.subtitle || ''
    const date = heroConfig?.date ? `${heroConfig.date}` : ''

    const mainLocation = placesConfig?.locations?.[1]
    const placeTitle = mainLocation?.title || ''
    const placeAddress = mainLocation?.location || ''

    return (
        <header className="ticket__header">
            <div className="ticket__event-title">
                {subtitle && <span className="ticket__event-subtitle">{subtitle}</span>}
                {title && <h2 className="ticket__couple-names">{title}</h2>}
            </div>

            <div className="ticket__event-details">
                {date && (
                    <div className="ticket__detail-item">
                        <CalendarBlankIcon className="ticket__detail-icon" size={24} weight="thin" />
                        <div className="ticket__detail-text">
                            <span className="ticket__detail-label">Fecha</span>
                            <span className="ticket__detail-value">{date}</span>
                        </div>
                    </div>
                )}

                {(placeTitle || placeAddress) && (
                    <div className="ticket__detail-item">
                        <MapPinIcon className="ticket__detail-icon" size={24} weight="thin" />
                        <div className="ticket__detail-text">
                            <span className="ticket__detail-label">Lugar</span>
                            {placeTitle && <span className="ticket__detail-value">{placeTitle}</span>}
                            {placeAddress && <span className="ticket__detail-subvalue">{placeAddress}</span>}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
