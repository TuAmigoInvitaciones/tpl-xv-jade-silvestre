import React from 'react'
import { PlayIcon, PauseIcon, MusicNotesIcon } from '@phosphor-icons/react'
import { useMusicPlayer } from '@/common/hooks'
import { Button } from '../button/Button'
import song from '@/assets/music/song.mp3'
import type { MusicPlayerProps } from '@/common/types'

export const MusicPlayer: React.FC<MusicPlayerProps> = (props) => {
    const {
        isPlaying,
        isMusicVisible,
        audioRef,
        activeVariant,
        activeBtnVariant,
        activeSongTitle,
        activeArtistName,
        onToggleMusic,
    } = useMusicPlayer(props)

    if (!isMusicVisible) return null

    const variantClass = `music-player--${activeVariant}`
    const playingClass = isPlaying ? 'music-player--playing' : ''
    const combinedClassName = ['music-player', variantClass, playingClass, props.className].filter(Boolean).join(' ')

    return (
        <div className={combinedClassName}>
            <audio ref={audioRef} src={song} loop preload="auto" />

            {activeVariant === 'floating' ? (
                <Button
                    isFloating
                    variant={activeBtnVariant}
                    onClick={onToggleMusic}
                    aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
                    icon={
                        isPlaying ? (
                            <PauseIcon size={24} weight="fill" />
                        ) : (
                            <PlayIcon size={24} weight="fill" />
                        )
                    }
                />
            ) : (
                <div className="music-player__card">
                    <div className="music-player__card-icon">
                        <MusicNotesIcon size={24} weight="duotone" className="music-player__disc" />
                    </div>

                    <div className="music-player__card-info">
                        <span className="music-player__card-title">{activeSongTitle}</span>
                        <div className="music-player__card-status">
                            {isPlaying ? (
                                <>
                                    <div className="music-player__equalizer" aria-hidden="true">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <span>Reproduciendo</span>
                                </>
                            ) : (
                                <span>{activeArtistName}</span>
                            )}
                        </div>
                    </div>

                    <Button
                        variant={activeBtnVariant}
                        size="sm"
                        onClick={onToggleMusic}
                        icon={
                            isPlaying ? (
                                <PauseIcon size={24} weight="fill" />
                            ) : (
                                <PlayIcon size={24} weight="fill" />
                            )
                        }
                    >
                        {isPlaying ? 'Pausar' : 'Reproducir'}
                    </Button>
                </div>
            )}
        </div>
    )
}
