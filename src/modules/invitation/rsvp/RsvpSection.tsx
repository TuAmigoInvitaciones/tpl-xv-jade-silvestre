import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTicket, useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { LinkIcon } from '@phosphor-icons/react'
import envelopeOpen from '@/assets/images/icons/envelope-open.svg'
import selloIcon from '@/assets/images/icons/sello.svg'

import bg from '@/assets/images/backgrounds/bg-1.svg'

const CUBIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const STAMP_EASE: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

export const RsvpSection: React.FC = () => {
    const navigate = useNavigate()
    const { ticket } = useTicket()
    const { config, sections } = useInvitationConfig()

    const showTicketSystem = Boolean(config?.hasTicketingSystem || sections?.ticket?.showTicket)
    if (!showTicketSystem) return null

    const guestName = ticket?.name || 'Familia Invitada'

    return (
        <section id="rsvp" className="rsvp">
            <motion.div
                className="rsvp__bg"
                style={{ backgroundImage: `url(${bg})` }}
                initial={{ opacity: 0, scale: 1.06 }}
                whileInView={{ opacity: 0.2, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: CUBIC_EASE }}
            />

            <div className="rsvp__container">
                <motion.div
                    className="rsvp__envelope-wrapper"
                    initial={{ opacity: 0, y: 45, rotateX: 8 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.2, ease: CUBIC_EASE }}
                >
                    <motion.img
                        src={envelopeOpen}
                        alt="Sobre abierto"
                        className="rsvp__envelope-img"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />

                    <motion.div
                        className="rsvp__card"
                        initial={{ opacity: 0, y: 55, scale: 0.94 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.25, ease: CUBIC_EASE }}
                    >
                        <motion.img
                            src={selloIcon}
                            alt="Sello"
                            className="rsvp__stamp-img"
                            initial={{ opacity: 0, scale: 2.2, rotate: -25 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, delay: 0.75, ease: STAMP_EASE }}
                        />

                        <div className="rsvp__card-inner">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.45, ease: CUBIC_EASE }}
                            >
                                <SectionHeader
                                    pretitle="Reservado para:"
                                    title="Pases de Acceso"
                                    align="center"
                                />
                            </motion.div>

                            {guestName && (
                                <motion.h3
                                    className="rsvp__guest-name"
                                    initial={{ opacity: 0, scale: 0.92, y: 12 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: 0.6, ease: CUBIC_EASE }}
                                >
                                    {guestName}
                                </motion.h3>
                            )}

                            <motion.p
                                className="rsvp__description"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.75, ease: CUBIC_EASE }}
                            >
                                Presiona el botón a continuación para consultar tus boletos asignados e información de tus pases.
                            </motion.p>

                            <motion.div
                                className="rsvp__action"
                                initial={{ opacity: 0, y: 18, scale: 0.94 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: 0.9, ease: CUBIC_EASE }}
                            >
                                <Button
                                    variant="secondary"
                                    radius="full"
                                    icon={<LinkIcon size={20} />}
                                    onClick={() => navigate('/ticket')}
                                    className="rsvp__ticket-btn"
                                >
                                    Ver mis boletos
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

