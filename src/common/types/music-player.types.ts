import type { ButtonVariant } from './button.types'

export type MusicPlayerVariant = 'floating' | 'card'

export interface MusicPlayerProps {
    show?: boolean
    variant?: MusicPlayerVariant
    buttonVariant?: ButtonVariant
    songTitle?: string
    artistName?: string
    className?: string
}
