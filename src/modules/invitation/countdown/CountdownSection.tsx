import React from 'react'
import { CalendarPlusIcon } from '@phosphor-icons/react'

import { useInvitationConfig, useCalendar, useSaveTheDate } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Countdown } from '@/common/components/countdown/Countdown'
import { Button } from '@/common/components/button/Button'

import flor1 from '@/assets/images/icons/flor-esquina-superior-derecha.svg'
import flor2 from '@/assets/images/icons/flor-esquina-inferior-izquierda.svg'
import photo from '@/assets/images/photos/7.jpg'

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
                <img src={flor1} alt="Flor decorativa" className="countdown-section__flower-1" />
                <img src={flor2} alt="Flor decorativa" className="countdown-section__flower-2" />
                <div className="countdown-section__container">

                    <div className="countdown-section__header">
                        <SectionHeader
                            pretitle="Cuenta Regresiva"
                            title="Solo Falta"
                            align="center"
                        />
                    </div>

                    <div className="countdown-section__content">
                        <Countdown
                            targetDate={countdownConfig.targetDate}
                            variant="minimal"
                        />
                    </div>

                    <div className="countdown-section__calendar">
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
                    </div>

                    <div className="countdown-section__button">
                        <Button
                            variant="secondary"
                            radius="full"
                            icon={<CalendarPlusIcon size={20} />}
                            onClick={() => downloadSaveTheDate()}
                        >
                            GUARDAR RECORDATORIO
                        </Button>
                    </div>
                </div>
            </section>
            <div className="countdown-section__photo">
                <div className="countdown-section__overlay"></div>
                <img src={photo} alt="" />
            </div>
        </>
    )
}
