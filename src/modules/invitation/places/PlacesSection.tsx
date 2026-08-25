import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { MapPinIcon } from '@phosphor-icons/react'

import logo from '@/assets/images/icons/logo.svg'
import photo from '@/assets/images/photos/8.jpg'
import cabania from '@/assets/images/icons/cabania.svg'
import temploIcon from '@/assets/images/icons/templo.svg'
import copasIcon from '@/assets/images/icons/copas.svg'
import flor from '@/assets/images/icons/flor-2.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const PLACE_ICONS: Record<number, string> = {
    0: temploIcon,
    1: copasIcon,
}

const getCardVariant = (idx: number) => ({
    initial: { opacity: 0, x: idx % 2 === 0 ? -35 : 35, y: 15 },
    animate: { opacity: 1, x: 0, y: 0 },
})

export const PlacesSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const placesConfig = sections.places
    const heroConfig = sections.hero

    if (!placesConfig?.showPlaces || !placesConfig?.locations) {
        return null
    }

    const eventDate = heroConfig?.date || '18 DE DICIEMBRE DE 2026'

    return (
        <>
            <motion.div
                className="places-section__image"
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.3, ease: FLUID_EASE }}
            >
                <div className="places-section__overlay"></div>
                <img src={photo} alt="photo" />
            </motion.div>
            <section id="places" className="places-section">
                <div className="places-section__container">

                    <div className="places-section__logo">
                        <img src={logo} alt="Quinceañera Logo" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.2, ease: FLUID_EASE }}
                    >
                        <SectionHeader
                            pretitle="Los Recintos"
                            title="Ubicaciones"
                            align="center"
                        />
                    </motion.div>

                    {eventDate && (
                        <motion.p
                            className="places-section__date"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, delay: 0.3, ease: FLUID_EASE }}
                        >
                            {eventDate}
                        </motion.p>
                    )}

                    <div className="places-section__grid">
                        {placesConfig.locations.map((loc, idx) => {
                            const variant = getCardVariant(idx)
                            const placeIcon = PLACE_ICONS[idx]

                            return (
                                <motion.div
                                    key={idx}
                                    className="places-item"
                                    initial={variant.initial}
                                    whileInView={variant.animate}
                                    viewport={{ once: true, margin: '-10% 0px' }}
                                    transition={{ duration: 1.1, delay: 0.35 + idx * 0.22, ease: FLUID_EASE }}
                                >
                                    <div className={`places-item__flor ${idx === 0 ? 'places-item__flor--first' : 'places-item__flor--second'}`}>
                                        <img src={flor} alt="Flor" />
                                    </div>

                                    {placeIcon && (
                                        <div className="places-item__icon">
                                            <img src={placeIcon} alt={loc.title || 'Icono recinto'} />
                                        </div>
                                    )}

                                    <h3 className="places-item__title">{loc.title}</h3>

                                    {loc.time && (
                                        <p className="places-item__time">{loc.time}</p>
                                    )}

                                    {loc.venue && (
                                        <h4 className="places-item__venue">{loc.venue}</h4>
                                    )}

                                    {loc.location && (
                                        <p className="places-item__address">{loc.location}</p>
                                    )}


                                    {loc.url && (
                                        <Button
                                            icon={<MapPinIcon size={20} weight="thin" />}
                                            variant="secondary"
                                            radius="full"
                                            onClick={() => window.open(loc.url, '_blank', 'noopener,noreferrer')}
                                            className="places-item__button"
                                        >
                                            Ver ubicación
                                        </Button>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>

                    <motion.div
                        className="places-section__draw"
                        initial={{ opacity: 0, y: 30, scale: 0.94 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.7, ease: FLUID_EASE }}
                    >
                        <img src={cabania} alt="Cabaña" />
                    </motion.div>
                </div>
            </section>
        </>
    )
}
