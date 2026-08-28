import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { Particles } from '@/common/components/particles/Particles'
import heroMobile from '@/assets/images/photos/1.jpeg'
import heroDesktop from '@/assets/images/photos/14.jpg'
import coronaIcon from '@/assets/images/icons/corona.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

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

            <motion.div
                className="hero-section__overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.8, ease: 'easeOut' }}
            />

            <motion.div
                className="hero-section__bg hero-section__bg--mobile"
                style={{ backgroundImage: `url(${heroMobile})` }}
                initial={{ scale: 1.14, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 3.2, ease: FLUID_EASE }}
            />

            <motion.div
                className="hero-section__bg hero-section__bg--desktop"
                style={{ backgroundImage: `url(${heroDesktop})` }}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 3.2, ease: FLUID_EASE }}
            />


            <div className="hero-section__container">
                {eventSubtitle && (
                    isFifteen ? (
                        <motion.div
                            className="hero-subtitle-badge"
                            initial={{ opacity: 0, y: -22, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 2.8, delay: 0.25, ease: FLUID_EASE }}
                        >
                            <div className="hero-subtitle-badge__group">
                                <span className="hero-subtitle-badge__number">&mdash; XV</span>
                                <span className="hero-subtitle-badge__text">AÑOS &mdash;</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.p
                            className="hero-section__subtitle"
                            initial={{ opacity: 0, y: -18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2.8, delay: 0.25, ease: FLUID_EASE }}
                        >
                            {eventSubtitle}
                        </motion.p>
                    )
                )}

                {eventTitle && (
                    <motion.h1
                        className="hero-section__title"
                        initial={{ opacity: 0, scale: 0.92, y: 22 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 2.8, delay: 0.5, ease: FLUID_EASE }}
                    >
                        {eventTitle}
                    </motion.h1>
                )}

                {eventDate && (
                    <motion.div
                        className="hero-section__date"
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2.8, delay: 0.75, ease: FLUID_EASE }}
                    >
                        <span className="hero-section__date-day">
                            <motion.img
                                src={coronaIcon}
                                alt="Corona"
                                className="hero-section__crown"
                                initial={{ scale: 0, opacity: 0, rotate: -35 }}
                                animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                transition={{ duration: 1.2, delay: 1.05, ease: FLUID_EASE }}
                            />
                            18
                        </span>
                        <span className="hero-section__date-month"> . 12 .</span>
                        <span className="hero-section__date-year">26</span>
                    </motion.div>
                )}



            </div>
        </section>
    )
}
