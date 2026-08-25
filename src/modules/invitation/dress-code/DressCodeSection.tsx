import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

import dressCode from '@/assets/images/icons/dress-code.svg'
import florCentral from '@/assets/images/icons/flor-central.svg'
import photo from '@/assets/images/photos/2.jpeg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const DressCodeSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const dressCodeConfig = sections.dressCode

    if (!dressCodeConfig?.showDressCode) {
        return null
    }

    const title = dressCodeConfig.title || 'Dress Code'
    const description = dressCodeConfig.description
    const attire = dressCodeConfig.attire

    const swatches = [
        'dress-code-section__color-circle--2',
        'dress-code-section__color-circle--3',
        'dress-code-section__color-circle--4',
        'dress-code-section__color-circle--5',
    ]

    return (
        <section id="dress-code" className="dress-code-section">
            <div className="dress-code-section__container">
                <motion.div
                    className="dress-code-section__flor dress-code-section__flor--top-right"
                    initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: FLUID_EASE }}
                >
                    <img src={florCentral} alt="Flor decorativa" />
                </motion.div>

                <motion.div
                    className="dress-code-section__flor dress-code-section__flor--bottom-left"
                    initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: FLUID_EASE }}
                >
                    <img src={florCentral} alt="Flor decorativa" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="CÓDIGO DE VESTIMENTA"
                        title={title}
                        align="center"
                    />
                </motion.div>

                {description && (
                    <motion.p
                        className="dress-code-section__description"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: FLUID_EASE }}
                    >
                        {description}
                    </motion.p>
                )}

                <motion.div
                    className="dress-code-section__illustration"
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.25, ease: FLUID_EASE }}
                >
                    <div className="dress-code-section__icon">
                        <img src={dressCode} alt="Dress Code" />
                    </div>
                </motion.div>

                <div className="dress-code-section__content">
                    {(attire?.women || attire?.men) && (
                        <div className="dress-code-section__attire">
                            {attire.women && (
                                <motion.p
                                    className="dress-code-section__attire-line"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.35, ease: FLUID_EASE }}
                                >
                                    <span className="dress-code-section__attire-label">Damas:</span> {attire.women}
                                </motion.p>
                            )}
                            {attire.men && (
                                <motion.p
                                    className="dress-code-section__attire-line"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.45, ease: FLUID_EASE }}
                                >
                                    <span className="dress-code-section__attire-label">Hombres:</span> {attire.men}
                                </motion.p>
                            )}
                        </div>
                    )}

                    <div className="dress-code-section__color-swatches">
                        {swatches.map((swatchClass, index) => (
                            <motion.span
                                key={swatchClass}
                                className={`dress-code-section__color-circle ${swatchClass}`}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.5 + index * 0.1,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <motion.div
                className="dress-code-section__photo-frame"
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: 0.6, ease: FLUID_EASE }}
            >
                <div className="dress-code-section__photo-inner">
                    <img src={photo} alt="Foto Dress Code" />
                </div>
            </motion.div>
        </section>
    )
}









