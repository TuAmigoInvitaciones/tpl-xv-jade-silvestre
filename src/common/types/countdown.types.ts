export type CountdownVariant = 'boxes' | 'circles' | 'inline' | 'grid-2x2' | 'minimal' | 'cards'

export interface CountdownLabels {
    days?: string
    hours?: string
    minutes?: string
    seconds?: string
}

export interface CountdownProps {
    targetDate: string
    variant?: CountdownVariant
    showLabels?: boolean
    labels?: CountdownLabels
    className?: string
}

export interface CountdownTime {
    days: number
    hours: number
    minutes: number
    seconds: number
    isCompleted: boolean
}
