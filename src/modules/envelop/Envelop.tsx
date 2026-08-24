import React, { useRef, useState } from 'react'
import { useNavigation, useMusicPlayer } from '@/common/hooks'

export const Envelop: React.FC = () => {
    const timeoutRef = useRef<number | null>(null)
    const [isPlayStarted, setIsPlayStarted] = useState(false)
    const [showFlash, setShowFlash] = useState(false)
    const { goTo } = useNavigation()
    const { onPlayMusic } = useMusicPlayer()

    const triggerFlashAndNavigate = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setShowFlash(true)
        setTimeout(() => goTo('/invitation'), 1200)
    }

    const handleOpen = () => {
        if (isPlayStarted) return
        setIsPlayStarted(true)
        onPlayMusic()
        triggerFlashAndNavigate()
    }

    return (
        <div className="envelop" onClick={handleOpen}>
            <div className="envelop__card">
                <h1 className="envelop__title">
                    Invitación Especial
                </h1>
                <p className="envelop__subtitle">
                    Haz clic para abrir tu invitación
                </p>
            </div>

            {!isPlayStarted && (
                <div className="envelop__indicator-ring" />
            )}

            {showFlash && (
                <div className="envelop__flash-transition" />
            )}
        </div>
    )
}
