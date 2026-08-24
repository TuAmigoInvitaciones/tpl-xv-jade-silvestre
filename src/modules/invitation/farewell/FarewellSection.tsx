import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const FarewellSection: React.FC = () => {
    const { sections } = useInvitationConfig()

    const eventTitle = sections.hero?.names || sections.hero?.title || ''
    const eventDate = sections.hero?.date || ''

    return (
        <section id="farewell" className="farewell">
            <div className="farewell__container">
                {eventTitle && <h2 className="farewell__title">{eventTitle}</h2>}
                {eventDate && <span className="farewell__date">{eventDate}</span>}
            </div>
        </section>
    )
}
