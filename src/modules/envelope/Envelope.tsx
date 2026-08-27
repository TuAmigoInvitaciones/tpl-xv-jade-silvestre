import React, { useRef, useState } from 'react'
import { useNavigation, useMusicPlayer } from '@/common/hooks'

export const Envelope: React.FC = () => {
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
        <div className="envelope" onClick={handleOpen}>
            <div className="envelope__card">
                <h1 className="envelope__title">
                    Invitación Especial
                </h1>
                <p className="envelope__subtitle">
                    Haz clic para abrir tu invitación
                </p>
            </div>

            {!isPlayStarted && (
                <div className="envelope__indicator-ring" />
            )}

            {showFlash && (
                <div className="envelope__flash-transition" />
            )}
        </div>
    )
}
