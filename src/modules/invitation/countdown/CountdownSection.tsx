import React from 'react'
import { useInvitationConfig, useCalendar } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Countdown } from '@/common/components/countdown/Countdown'

export const CountdownSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const countdownConfig = sections.countdown
    const { monthTitle, weekdays, days } = useCalendar()

    if (!countdownConfig?.showCountdown || !countdownConfig?.targetDate) {
        return null
    }

    return (
        <section id="countdown" className="countdown-section">
            <div className="countdown-section__container">
                <SectionHeader
                    pretitle="CUENTA REGRESIVA"
                    title="Fecha Especial"
                    align="center"
                    variant="uppercase"
                />

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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
