import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'

import flowers from '@/assets/images/icons/flores-inferiores.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const FamilySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const familyConfig = sections.family

    if (familyConfig?.showFamily === false) {
        return null
    }

    const parents = (familyConfig?.parents as string[]) || [
        'Yesenia Ortega Ortiz',
        'Francisco Javier Nava Trinidad',
    ]

    const godparents = (familyConfig?.godparents as string[]) || [
        'Rosa Trinidad Carmona',
        'Rosa Ma. Ortiz Saucedo',
    ]

    return (
        <section id="family" className="family-section">
            <motion.div
                className="family-section__container"
                initial={{ opacity: 0, y: 35, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.1, ease: FLUID_EASE }}
            >
                <motion.div
                    className="family-section__decoration family-section__decoration--rotate  family-section__decoration--1"
                    initial={{ opacity: 0, scale: 0.92, rotate: 180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 180 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.1, ease: FLUID_EASE }}
                >
                    <img src={flowers} alt="Flores" />
                </motion.div>

                <motion.div
                    className="family-section__quote-container"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.3, ease: FLUID_EASE }}
                >
                    <p className="family-section__quote">
                        “Pues mandará a sus ángeles acerca de tí, para que te guarden en todos tus caminos.”
                    </p>
                    <span className="family-section__quote-author">&mdash; SALMO 91:11 &mdash;</span>
                </motion.div>

                <motion.h2
                    className="family-section__blessing"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.4, ease: FLUID_EASE }}
                >
                    CON LA BENDICIÓN DE DIOS Y EN COMPAÑÍA<br />DE MIS PADRES Y PADRINOS
                </motion.h2>

                <div className="family-section__grid">
                    <motion.div
                        className="family-section__group"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 0.5, ease: FLUID_EASE }}
                    >
                        <h3 className="family-section__role">MIS PADRES</h3>
                        <div className="family-section__names">
                            {parents.map((name, index) => (
                                <p key={index} className="family-section__name">{name}</p>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="family-section__group"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.0, delay: 0.6, ease: FLUID_EASE }}
                    >
                        <h3 className="family-section__role">MIS PADRINOS</h3>
                        <div className="family-section__names">
                            {godparents.map((name, index) => (
                                <p key={index} className="family-section__name">{name}</p>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="family-section__decoration  family-section__decoration--2"
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.0, delay: 0.7, ease: FLUID_EASE }}
                >
                    <img src={flowers} alt="Flores" />
                </motion.div>
            </motion.div>
        </section>
    )
}
