import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import photo1 from '@/assets/images/photos/14.jpg'
import photo2 from '@/assets/images/photos/12.jpg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const FarewellSection: React.FC = () => {
    const { sections } = useInvitationConfig()

    const eventTitle = sections.hero?.names || sections.hero?.title || 'Grethel Stefania'
    const eventDate = sections.hero?.date || '18 DE DICIEMBRE DE 2026'

    return (
        <section id="farewell" className="farewell">
            <div className="farewell__container">
                <motion.div
                    className="farewell__polaroid-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: FLUID_EASE }}
                >
                    <motion.div
                        className="farewell__polaroid farewell__polaroid--1"
                        initial={{ opacity: 0, rotate: -14, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotate: -7, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.2, ease: FLUID_EASE }}
                    >
                        <div className="farewell__polaroid-img">
                            <img src={photo1} alt="Grethel Stefania" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="farewell__polaroid farewell__polaroid--2"
                        initial={{ opacity: 0, rotate: 14, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotate: 7, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.4, ease: FLUID_EASE }}
                    >
                        <div className="farewell__polaroid-img">
                            <img src={photo2} alt="Grethel Stefania" />
                        </div>
                    </motion.div>

                </motion.div>

                <div className="farewell__text-content">
                    <p className="farewell__subtitle">Gracias por acompañarme</p>
                    {eventTitle && <h2 className="farewell__title">{eventTitle}</h2>}
                    {eventDate && <span className="farewell__date">{eventDate}</span>}
                </div>

                <div className="farewell__credit">
                    <span className="farewell__credit-text">Hecho con ❤️ por</span>
                    <a
                        href="https://www.instagram.com/tuamigoinvitaciones/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="farewell__credit-link"
                    >
                        TuAmigoInvitaciones
                    </a>
                </div>
            </div>
        </section>
    )
}

