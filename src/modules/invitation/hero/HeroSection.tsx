import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { Particles } from '@/common/components/particles/Particles'
import hero from '@/assets/images/photos/1.jpeg'
import coronaIcon from '@/assets/images/icons/corona.svg'

export const HeroSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const heroConfig = sections.hero

    if (heroConfig?.showHero === false) {
        return null
    }

    const eventTitle = heroConfig?.names || heroConfig?.title || ''
    const eventSubtitle = heroConfig?.subtitle || ''
    const eventDate = heroConfig?.date || ''

    const isFifteen = eventSubtitle.toLowerCase().includes('xv') || eventSubtitle.toLowerCase().includes('15') || eventSubtitle.toLowerCase().includes('quince')

    return (
        <section id="hero" className="hero-section">
            <Particles
                variant="glitter"
                count={30}
                colors={['#FFFFFF', '#FFF8DC', '#FFD700', '#D4AF37', '#F3E5AB', '#E6CA65', '#FFF3CD', '#E5E4E2', '#C0C0C0']}
                minSize={1.5}
                maxSize={4.5}
                speed={0.85}
                direction="down"
                zIndex={3}
            />
            <div className="hero-section__overlay"></div>
            <div className="hero-section__bg" style={{ backgroundImage: `url(${hero})` }}></div>
            <div className="hero-section__container">
                {eventSubtitle && (
                    isFifteen ? (
                        <div className="hero-subtitle-badge">
                            <div className="hero-subtitle-badge__group">
                                <svg className="hero-subtitle-badge__swash hero-subtitle-badge__swash--left" viewBox="0 0 75 32" fill="none">
                                    <path d="M 4 6 C 16 -2, 24 30, 48 28 C 62 26, 70 17, 75 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                <span className="hero-subtitle-badge__number">XV</span>
                                <span className="hero-subtitle-badge__text">AÑOS</span>
                                <svg className="hero-subtitle-badge__swash hero-subtitle-badge__swash--right" viewBox="0 0 88 32" fill="none">
                                    <path d="M 0 16 C 5 17, 13 26, 27 28 C 51 30, 59 -2, 71 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M 78 1 C 78 5, 79.5 6, 83 6.5 C 79.5 7, 78 8, 78 12 C 78 8, 76.5 7, 73 6.5 C 76.5 6, 78 5, 78 1 Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <p className="hero-section__subtitle">{eventSubtitle}</p>
                    )
                )}
                {eventTitle && <h1 className="hero-section__title">{eventTitle}</h1>}
                {eventDate && (
                    <div className="hero-section__date">
                        <span className="hero-section__date-day">
                            <img src={coronaIcon} alt="Corona" className="hero-section__crown" />
                            18
                        </span>
                        <span> . 12 . 26</span>
                    </div>
                )}
            </div>
        </section>
    )
}
