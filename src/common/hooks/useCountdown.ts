import { useState, useEffect, useCallback } from 'react'
import type { CountdownTime } from '@/common/types'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const parseTargetDate = (dateInput: string | number | Date): Date => {
    if (dateInput instanceof Date) return dateInput
    if (typeof dateInput === 'number') return new Date(dateInput)

    const parsed = new Date(dateInput)
    if (!isNaN(parsed.getTime())) return parsed

    if (typeof dateInput === 'string' && dateInput.includes('/')) {
        const [datePart, timePart = '00:00'] = dateInput.trim().split(/\s+/)
        const [day, month, year] = datePart.split('/').map(Number)
        const [hour, minute] = timePart.split(':').map(Number)
        return new Date(year, month - 1, day, hour, minute)
    }

    return new Date()
}

const calculateRemaining = (targetDate: Date): CountdownTime => {
    const difference = targetDate.getTime() - Date.now()

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true }
    }

    return {
        days: Math.floor(difference / DAY),
        hours: Math.floor((difference % DAY) / HOUR),
        minutes: Math.floor((difference % HOUR) / MINUTE),
        seconds: Math.floor((difference % MINUTE) / SECOND),
        isCompleted: false,
    }
}

export const useCountdown = (targetDateInput: string | number | Date): CountdownTime => {
    const getTarget = useCallback(() => parseTargetDate(targetDateInput), [targetDateInput])

    const [timeLeft, setTimeLeft] = useState<CountdownTime>(() => calculateRemaining(getTarget()))

    useEffect(() => {
        const targetDate = getTarget()

        const updateTimer = () => {
            const remaining = calculateRemaining(targetDate)
            setTimeLeft(remaining)
            return remaining.isCompleted
        }

        updateTimer()
        const timer = setInterval(() => {
            const isCompleted = updateTimer()
            if (isCompleted) clearInterval(timer)
        }, 1000)

        return () => clearInterval(timer)
    }, [getTarget])

    return timeLeft
}
