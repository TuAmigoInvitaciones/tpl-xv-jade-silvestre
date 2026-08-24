import React from 'react'
import { useCountdown } from '@/common/hooks'
import type { CountdownProps } from '@/common/types'

export const CountdownBox: React.FC<{
    number: string | number
    concept?: string
    showConcept?: boolean
}> = ({ number, concept, showConcept = true }) => {
    return (
        <div className="countdown__box">
            <span className="countdown__number">{String(number).padStart(2, '0')}</span>
            {showConcept && concept && <span className="countdown__concept">{concept}</span>}
        </div>
    )
}

export const Countdown: React.FC<CountdownProps> = ({
    targetDate,
    variant = 'boxes',
    showLabels = true,
    labels = {},
    className = '',
}) => {
    const { days, hours, minutes, seconds } = useCountdown(targetDate)

    const defaultLabels = {
        days: 'Días',
        hours: 'Horas',
        minutes: 'Min',
        seconds: 'Seg',
        ...labels,
    }

    const units = [
        { key: 'days', number: days, concept: defaultLabels.days },
        { key: 'hours', number: hours, concept: defaultLabels.hours },
        { key: 'minutes', number: minutes, concept: defaultLabels.minutes },
        { key: 'seconds', number: seconds, concept: defaultLabels.seconds },
    ]

    const variantClass = `countdown--${variant}`
    const combinedClass = `countdown ${variantClass} ${className}`.trim()

    return (
        <div className={combinedClass}>
            <div className="countdown__items">
                {units.map((unit, index) => (
                    <React.Fragment key={unit.key}>
                        <CountdownBox
                            number={unit.number}
                            concept={unit.concept}
                            showConcept={showLabels}
                        />
                        {variant === 'minimal' && index < units.length - 1 && (
                            <span className="countdown__separator">:</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
