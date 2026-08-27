import React from 'react'
import { motion } from 'framer-motion'
import { CalendarPlusIcon } from '@phosphor-icons/react'

import { useInvitationConfig, useCalendar, useSaveTheDate } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Countdown } from '@/common/components/countdown/Countdown'
import { Button } from '@/common/components/button/Button'

import flor1 from '@/assets/images/icons/flor-esquina-superior-derecha.svg'
import flor2 from '@/assets/images/icons/flor-esquina-inferior-izquierda.svg'
import photo from '@/assets/images/photos/7.jpg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const CountdownSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const countdownConfig = sections.countdown
    const { monthTitle, weekdays, days } = useCalendar()
    const { downloadSaveTheDate } = useSaveTheDate()

    if (!countdownConfig?.showCountdown || !countdownConfig?.targetDate) {
        return null
    }

    return (
        <>
            <section id="countdown" className="countdown-section">
                <motion.img
                    src={flor1}
                    alt="Flor decorativa"
                    className="countdown-section__flower-1"
                    initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
                    whileInView={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.2, ease: FLUID_EASE }}
                />
                <motion.img
                    src={flor2}
                    alt="Flor decorativa"
                    className="countdown-section__flower-2"
                    initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
                    whileInView={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.2, ease: FLUID_EASE }}
                />

                <div className="countdown-section__container">
                    <div className="countdown-section__grid">
                        <div className="countdown-section__col countdown-section__col--left">
                            <motion.div
                                className="countdown-section__header"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.1, delay: 0.1, ease: FLUID_EASE }}
                            >
                                <SectionHeader
                                    pretitle="Cuenta Regresiva"
                                    title="Solo Falta"
                                    align="center"
                                />
                            </motion.div>

                            <motion.div
                                className="countdown-section__content"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.1, delay: 0.25, ease: FLUID_EASE }}
                            >
                                <Countdown
                                    targetDate={countdownConfig.targetDate}
                                    variant="minimal"
                                />
                            </motion.div>

                            <p className="countdown-section__desktop-text">
                                Cada día, cada hora y cada segundo nos acercan a un momento inolvidable. ¡Acompáñanos a celebrar este día tan especial!
                            </p>
                        </div>

                        <div className="countdown-section__col countdown-section__col--right">
                            <motion.div
                                className="countdown-section__calendar"
                                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.1, delay: 0.4, ease: FLUID_EASE }}
                            >
                                {monthTitle && <p className="countdown-section__calendar-title">{monthTitle}</p>}
                                <div className="countdown-section__calendar-grid">
                                    {weekdays.map(day => (
                                        <div key={day} className="countdown-section__calendar-head">
                                            {day}
                                        </div>
                                    ))}
                                    {days.map(dayItem => (
                                        <div
                                            key={dayItem.id}
                                            className={[
                                                'countdown-section__calendar-day',
                                                dayItem.isFeatured ? 'countdown-section__calendar-day--featured' : '',
                                                !dayItem.isCurrentMonth ? 'countdown-section__calendar-day--muted' : '',
                                            ].filter(Boolean).join(' ')}
                                        >
                                            <span className="countdown-section__calendar-num">{dayItem.dayNumber}</span>
                                            {dayItem.isFeatured && (
                                                <svg viewBox="0 0 24 24" className="countdown-section__calendar-heart">
                                                    <path
                                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                        fill="rgba(194, 159, 83, 0.2)"
                                                        stroke="currentColor"
                                                        strokeWidth="2.2"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="countdown-section__button"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 1.1, delay: 0.55, ease: FLUID_EASE }}
                            >
                                <Button
                                    variant="secondary"
                                    radius="full"
                                    icon={<CalendarPlusIcon size={20} className="countdown-section__btn-icon" />}
                                    onClick={() => downloadSaveTheDate()}
                                    className="countdown-section__btn"
                                >
                                    GUARDAR RECORDATORIO
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>

            </section>

            <motion.div
                className="countdown-section__photo"
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.3, ease: FLUID_EASE }}
            >
                <div className="countdown-section__overlay"></div>
                <img src={photo} alt="" />
            </motion.div>
        </>
    )
}
