import { useMemo } from 'react'
import { useInvitationConfig } from './useInvitationConfig'

export interface CalendarDayItem {
    id: string
    dayNumber: number
    isCurrentMonth: boolean
    isFeatured: boolean
    isPrevMonth?: boolean
    isNextMonth?: boolean
}

export interface UseCalendarOptions {
    month?: number
    year?: number
    featuredDay?: number
    weekdays?: string[]
}

export const useCalendar = (options?: UseCalendarOptions) => {
    const { sections } = useInvitationConfig()

    const targetDateStr = sections.countdown?.targetDate ?? '2026-08-07T19:00:00'
    const targetDate = useMemo(() => new Date(targetDateStr), [targetDateStr])

    const defaultMonth = !isNaN(targetDate.getTime()) ? targetDate.getMonth() + 1 : 8
    const defaultYear = !isNaN(targetDate.getTime()) ? targetDate.getFullYear() : 2026
    const defaultFeaturedDay = !isNaN(targetDate.getTime()) ? targetDate.getDate() : 7

    const month = options?.month ?? defaultMonth
    const year = options?.year ?? defaultYear
    const featuredDay = options?.featuredDay ?? defaultFeaturedDay
    const weekdays = options?.weekdays ?? ['do.', 'lu.', 'ma.', 'mi.', 'ju.', 'vi.', 'sá.']

    const calendarData = useMemo(() => {
        const validMonth = Math.max(1, Math.min(12, month))
        const monthIndex = validMonth - 1

        const firstDayOfMonth = new Date(year, monthIndex, 1)
        const totalDaysInMonth = new Date(year, validMonth, 0).getDate()

        const startDayOfWeek = firstDayOfMonth.getDay()

        const rawMonthName = firstDayOfMonth.toLocaleDateString('es-ES', { month: 'long' })
        const monthName = rawMonthName.charAt(0).toUpperCase() + rawMonthName.slice(1).toLowerCase()
        const monthTitle = `${rawMonthName.toUpperCase()} ${year}`

        const days: CalendarDayItem[] = []

        const prevMonthTotalDays = new Date(year, monthIndex, 0).getDate()
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const dayNum = prevMonthTotalDays - i
            days.push({
                id: `prev-${dayNum}`,
                dayNumber: dayNum,
                isCurrentMonth: false,
                isFeatured: false,
                isPrevMonth: true,
            })
        }

        for (let day = 1; day <= totalDaysInMonth; day++) {
            days.push({
                id: `curr-${day}`,
                dayNumber: day,
                isCurrentMonth: true,
                isFeatured: day === featuredDay,
            })
        }

        const totalGridSlots = days.length
        const remainingSlots = (7 - (totalGridSlots % 7)) % 7
        for (let day = 1; day <= remainingSlots; day++) {
            days.push({
                id: `next-${day}`,
                dayNumber: day,
                isCurrentMonth: false,
                isFeatured: false,
                isNextMonth: true,
            })
        }

        return {
            monthName,
            monthTitle,
            startDayOfWeek,
            totalDaysInMonth,
            days,
        }
    }, [month, year, featuredDay])

    return {
        year,
        month,
        monthName: calendarData.monthName,
        monthTitle: calendarData.monthTitle,
        weekdays,
        days: calendarData.days,
        totalDaysInMonth: calendarData.totalDaysInMonth,
        featuredDay,
    }
}
