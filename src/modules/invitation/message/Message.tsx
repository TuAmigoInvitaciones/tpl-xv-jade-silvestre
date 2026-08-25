import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const MessageSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const messageConfig = sections.message

    if (messageConfig?.showMessage === false) {
        return null
    }

    const messageText = messageConfig?.message || ''

    return (
        <section id="message" className="message-section">
            <motion.div
                className="message-section__container"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.1, ease: FLUID_EASE }}
            >
                <motion.div
                    className="message-section__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.1, delay: 0.15, ease: FLUID_EASE }}
                >
                    <SectionHeader
                        pretitle="Querida Familia"
                        title=""
                    />
                </motion.div>

                {messageText && (
                    <motion.p
                        className="message-section__text"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.35, ease: FLUID_EASE }}
                    >
                        {messageText}
                    </motion.p>
                )}
            </motion.div>
        </section>
    )
}
