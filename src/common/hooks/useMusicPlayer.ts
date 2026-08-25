import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import type { RootState } from '@/store/store'
import { playMusic, pauseMusic, toggleMusic } from '@/store/ui/music.slice'
import { useInvitationConfig } from './useInvitationConfig'
import type { MusicPlayerProps, MusicPlayerVariant, ButtonVariant } from '@/common/types'

export const useMusicPlayer = (props?: MusicPlayerProps) => {
    const dispatch = useDispatch()
    const isPlaying = useSelector((state: RootState) => state.music.isPlaying)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const { theme, ui, config } = useInvitationConfig()
    const location = useLocation()
    const musicConfig = ui?.music || theme?.music

    useEffect(() => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.play().catch(() => {
                dispatch(pauseMusic())
            })
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying, dispatch])

    const onPlayMusic = () => dispatch(playMusic())
    const onPauseMusic = () => dispatch(pauseMusic())
    const onToggleMusic = () => dispatch(toggleMusic())

    const isHiddenRoute = location.pathname === '/envelop' || location.pathname === '/search'
    const isMusicVisible = (props?.show ?? musicConfig?.show ?? config?.hasMusic ?? true) && !isHiddenRoute
    const activeVariant: MusicPlayerVariant = props?.variant || musicConfig?.variant || 'floating'
    const activeBtnVariant: ButtonVariant = props?.buttonVariant || musicConfig?.buttonVariant || theme.buttonVariant || 'primary'
    const activeSongTitle = props?.songTitle || musicConfig?.songTitle || 'Música de fondo'
    const activeArtistName = props?.artistName || musicConfig?.artistName || 'Música del evento'

    return {
        isPlaying,
        isMusicVisible,
        audioRef,
        activeVariant,
        activeBtnVariant,
        activeSongTitle,
        activeArtistName,
        onPlayMusic,
        onPauseMusic,
        onToggleMusic,
    }
}
