import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const HeroSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const heroConfig = sections.hero

    if (heroConfig?.showHero === false) {
        return null
    }

    const eventTitle = heroConfig?.names || heroConfig?.title || ''
    const eventSubtitle = heroConfig?.subtitle || ''
    const eventDate = heroConfig?.date || ''

    return (
        <section id="hero" className="hero-section">
            <div className="hero-section__container">
                {eventTitle && <h1 className="hero-section__title">{eventTitle}</h1>}
                {eventSubtitle && <p className="hero-section__subtitle">{eventSubtitle}</p>}
                {eventDate && <span className="hero-section__date">{eventDate}</span>}
            </div>
        </section>
    )
}
