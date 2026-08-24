import React from 'react'
import { useScratchCard } from '@/common/hooks'
import type { UseScratchCardOptions } from '@/common/hooks'

export interface ScratchCardProps extends UseScratchCardOptions {
    children: React.ReactNode
    overlayText?: string
    className?: string
    style?: React.CSSProperties
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
    children,
    overlayText = 'Rasca para descubrir',
    className = '',
    style,
    ...options
}) => {
    const {
        containerRef,
        canvasRef,
        isRevealed,
        hasStarted,
        startScratch,
        moveScratch,
        stopScratch,
    } = useScratchCard(options)

    return (
        <div
            ref={containerRef}
            className={`scratch-card ${className}`}
            style={style}
        >
            <div className="scratch-card__content">{children}</div>

            {!isRevealed && (
                <canvas
                    ref={canvasRef}
                    className={`scratch-card__canvas ${isRevealed ? 'scratch-card__canvas--revealed' : ''}`}
                    onMouseDown={startScratch}
                    onMouseMove={moveScratch}
                    onMouseUp={stopScratch}
                    onMouseLeave={stopScratch}
                    onTouchStart={startScratch}
                    onTouchMove={moveScratch}
                    onTouchEnd={stopScratch}
                    onTouchCancel={stopScratch}
                />
            )}

            {overlayText && !hasStarted && !isRevealed && (
                <div className="scratch-card__hint">{overlayText}</div>
            )}
        </div>
    )
}
