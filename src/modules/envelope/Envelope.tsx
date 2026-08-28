import React, { useRef, useState } from 'react'
import { useNavigation, useMusicPlayer } from '@/common/hooks'
import envelopVideo from '@/assets/videos/envelop-video.mp4'

export const Envelope: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const timeoutRef = useRef<number | null>(null)
    const [isPlayStarted, setIsPlayStarted] = useState(false)
    const { goTo } = useNavigation()
    const { onPlayMusic } = useMusicPlayer()

    const handleOpen = () => {
        if (isPlayStarted) return
        setIsPlayStarted(true)
        onPlayMusic()

        // Safety fallback: if video fails to play or gets blocked, go to home after 5 seconds
        timeoutRef.current = window.setTimeout(() => {
            goTo('/invitation')
        }, 5000)

        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error('Error attempting to play video:', error)
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
                goTo('/invitation')
            })
        } else {
            goTo('/invitation')
        }
    }

    const handleVideoEnded = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        goTo('/invitation')
    }

    return (
        <div 
            className="envelope" 
            onClick={handleOpen} 
            style={{ 
                cursor: 'pointer',
                backgroundColor: '#f6f5f3', // Off-white matching the envelope paper
                overflow: 'hidden'
            }}
        >
            <video
                ref={videoRef}
                src={envelopVideo}
                playsInline
                {...{ 'webkit-playsinline': 'true' }}
                controls={false}
                muted
                preload="auto"
                className="envelope__video"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                }}
                onEnded={handleVideoEnded}
            />

            {/* Transparent pulsing indicator overlayed on the center seal area to guide the click */}
            {!isPlayStarted && (
                <div 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '8rem',
                        height: '8rem',
                        borderRadius: '50%',
                        border: '2px solid rgba(194, 159, 83, 0.4)',
                        backgroundColor: 'rgba(194, 159, 83, 0.05)',
                        zIndex: 2,
                        pointerEvents: 'none',
                        animation: 'pulseSealRing 2s infinite ease-in-out'
                    }}
                />
            )}

            <style>{`
                @keyframes pulseSealRing {
                    0% {
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.2);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0.8;
                    }
                }
            `}</style>
        </div>
    )
}
