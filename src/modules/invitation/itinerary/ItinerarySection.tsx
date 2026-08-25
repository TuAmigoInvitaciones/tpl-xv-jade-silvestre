import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { HeartIcon } from '@phosphor-icons/react'
import { useItinerary } from './hooks/useItinerary'

import illustration from '@/assets/images/icons/flores-itinerario.svg'
import illustrationBottom from '@/assets/images/icons/flores-itinerario-2.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const ItinerarySection: React.FC = () => {
    const {
        showItinerary,
        itineraryItems,
        gridRef,
        setItemRef,
        activeIndex,
        iconTop,
    } = useItinerary()

    if (!showItinerary) {
        return null
    }

    return (
        <section id="itinerary" className="itinerary">
            <motion.img
                className="itinerary__img itinerary__img--top"
                src={illustration}
                alt="Decoración itinerario"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 3.0, ease: FLUID_EASE }}
            />

            <div className="itinerary__container">
                <motion.div
                    className="itinerary__header"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.8, delay: 0.15, ease: FLUID_EASE }}
                >
                    <SectionHeader pretitle="Las Amenidades" title="Itinerario" />
                </motion.div>

                <div className="itinerary__grid" ref={gridRef}>
                    <div
                        className="itinerary__active-node"
                        style={{ top: `${iconTop}px` }}
                    >
                        <HeartIcon size={22} weight="bold" />
                    </div>

                    {itineraryItems.map((item, index: number) => {
                        const isEven = index % 2 === 0
                        const sideClass = isEven ? 'itinerary__item--left' : 'itinerary__item--right'
                        const isActive = index === activeIndex

                        return (
                            <motion.div
                                key={index}
                                ref={setItemRef(index)}
                                className={`itinerary__item ${sideClass} ${isActive ? 'itinerary__item--active' : ''}`}
                                style={{ gridRow: index + 1 }}
                                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 2.8, delay: 0.3 + index * 0.15, ease: FLUID_EASE }}
                            >
                                <div className="itinerary__node-outline">
                                    <HeartIcon size={18} weight="thin" />
                                </div>
                                {item.iconSrc && (
                                    <img
                                        src={item.iconSrc}
                                        alt={item.event}
                                        className="itinerary__item-icon"
                                    />
                                )}
                                <span className="itinerary__time">{item.time}</span>
                                <h3 className="itinerary__event">{item.event}</h3>

                            </motion.div>
                        )
                    })}

                </div>
            </div>

            <motion.img
                className="itinerary__img itinerary__img--bottom"
                src={illustrationBottom}
                alt="Decoración inferior itinerario"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 3.0, ease: FLUID_EASE }}
            />
        </section>
    )
}


