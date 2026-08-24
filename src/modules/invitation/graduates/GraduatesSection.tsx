import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/common/components/button/Button'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { useDrawer, useGraduates } from '@/common/hooks'
import { DRAWER_NAMES } from '@/store/ui/drawer.slice'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const careerContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.55,
        },
    },
}

const careerItemVariants: Variants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: FLUID_EASE },
    },
}

export const GraduatesSection: React.FC = () => {
    const { careers } = useGraduates()
    const { onOpenDrawer } = useDrawer()

    if (!careers || careers.length === 0) return null

    return (
        <section id="graduates" className="graduates">
            <div className="graduates__container">
                <motion.div
                    className="graduates__card"
                    initial={{ opacity: 0, scale: 0.93 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.3, delay: 0.15, ease: FLUID_EASE }}
                >
                    <div className="graduates__content">
                        <motion.p
                            className="graduates__sub-message"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 1.0, delay: 0.45, ease: FLUID_EASE }}
                        >
                            Lista de Graduados
                        </motion.p>

                        <motion.div
                            className="graduates__careers-list"
                            variants={careerContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-10% 0px' }}
                        >
                            {careers.map((career, index) => (
                                <motion.div key={career.id} className="graduates__career-item" variants={careerItemVariants}>
                                    {index > 0 && <div className="graduates__career-divider" />}
                                    <h4 className="graduates__career-name">{career.name}</h4>
                                    <Button
                                        icon={<ArrowUpRightIcon size={22} />}
                                        variant="outline"
                                        className="graduates__button"
                                        onClick={() => onOpenDrawer(DRAWER_NAMES.graduates, career.name)}
                                    >
                                        Ver grupo
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
