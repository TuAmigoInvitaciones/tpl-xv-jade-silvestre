import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { MapPinIcon } from '@phosphor-icons/react'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const getCardVariant = (idx: number) => ({
    initial: { opacity: 0, x: idx % 2 === 0 ? -35 : 35, y: 15 },
    animate: { opacity: 1, x: 0, y: 0 },
})

export const PlacesSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const placesConfig = sections.places

    if (!placesConfig?.showPlaces || !placesConfig?.locations) {
        return null
    }

    const formatLocalDate = (dateStr?: string) => {
        if (!dateStr) return ''
        const [year, month, day] = dateStr.split('-').map(Number)
        const dateObj = new Date(year, month - 1, day)

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }
        const formatted = dateObj.toLocaleDateString('es-ES', options)
        return formatted.charAt(0).toUpperCase() + formatted.slice(1)
    }

    return (
        <section id="places" className="places-section">
            <div className="places-section__container">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.2, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="DÓNDE Y CUÁNDO"
                        title="Ubicaciones"
                        align="center"
                        variant="uppercase"
                    />
                </motion.div>

                <div className="places-section__grid">
                    {placesConfig.locations.map((loc, idx) => {
                        const variant = getCardVariant(idx)
                        return (
                            <motion.div
                                key={idx}
                                className="places-item"
                                initial={variant.initial}
                                whileInView={variant.animate}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.1, delay: 0.35 + idx * 0.22, ease: FLUID_EASE }}
                            >
                                {loc.date && (
                                    <motion.p
                                        className="places-item__date"
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: '-10% 0px' }}
                                        transition={{ duration: 0.8, delay: 0.5 + idx * 0.22, ease: FLUID_EASE }}
                                    >
                                        {formatLocalDate(loc.date)}
                                    </motion.p>
                                )}

                                {loc.time && (
                                    <p className="places-item__time">{loc.time}</p>
                                )}

                                <h3 className="places-item__title">{loc.title}</h3>

                                {loc.location && (
                                    <p className="places-item__address">{loc.location}</p>
                                )}

                                {loc.url && (
                                    <Button
                                        icon={<MapPinIcon size={22} weight='thin' />}
                                        variant="secondary"
                                        onClick={() => window.open(loc.url, '_blank')}
                                        className="places-item__button"
                                    >
                                        Ver ubicación
                                    </Button>
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
