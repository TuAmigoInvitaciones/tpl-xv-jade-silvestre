import { useCallback } from 'react'
import confetti from 'canvas-confetti'

export interface ConfettiOptions {
    particleCount?: number
    colors?: string[]
    preset?: 'side-cannons' | 'explosion' | 'rain' | 'bazooka'
    spread?: number
    startVelocity?: number
    origin?: { x: number; y: number }
    scalar?: number
    zIndex?: number
}

export const useConfetti = () => {
    const fireConfetti = useCallback(
        ({
            particleCount = 800,
            colors = ['#4a4933', '#6b6b47', '#9a9180', '#5e6047', '#f5f8e5', '#e6dfd3', '#c4bcac'],
            preset = 'side-cannons',
            spread = 90,
            startVelocity = 85,
            origin = { x: 0.5, y: 0.7 },
            scalar = 1.3,
            zIndex = 9999,
        }: ConfettiOptions = {}) => {
            const halfCount = Math.floor(particleCount / 2)

            if (preset === 'side-cannons' || preset === 'bazooka') {
                confetti({
                    particleCount: halfCount,
                    angle: 60,
                    spread,
                    startVelocity,
                    origin: { x: 0, y: 0.85 },
                    colors,
                    scalar,
                    ticks: 400,
                    zIndex,
                    gravity: 1.1,
                    decay: 0.92,
                })

                confetti({
                    particleCount: halfCount,
                    angle: 120,
                    spread,
                    startVelocity,
                    origin: { x: 1, y: 0.85 },
                    colors,
                    scalar,
                    ticks: 400,
                    zIndex,
                    gravity: 1.1,
                    decay: 0.92,
                })

                setTimeout(() => {
                    confetti({
                        particleCount: Math.floor(halfCount * 0.85),
                        angle: 50,
                        spread: spread + 15,
                        startVelocity: Math.floor(startVelocity * 0.9),
                        origin: { x: 0.05, y: 0.9 },
                        colors,
                        scalar: scalar * 1.1,
                        ticks: 450,
                        zIndex,
                        gravity: 1.05,
                        decay: 0.91,
                    })

                    confetti({
                        particleCount: Math.floor(halfCount * 0.85),
                        angle: 130,
                        spread: spread + 15,
                        startVelocity: Math.floor(startVelocity * 0.9),
                        origin: { x: 0.95, y: 0.9 },
                        colors,
                        scalar: scalar * 1.1,
                        ticks: 450,
                        zIndex,
                        gravity: 1.05,
                        decay: 0.91,
                    })
                }, 120)
            } else if (preset === 'explosion') {
                confetti({
                    particleCount,
                    spread,
                    startVelocity: startVelocity * 1.1,
                    origin,
                    colors,
                    scalar,
                    ticks: 400,
                    zIndex,
                })
            } else if (preset === 'rain') {
                confetti({
                    particleCount,
                    angle: 90,
                    spread: 180,
                    startVelocity: 45,
                    origin: { x: 0.5, y: 0 },
                    colors,
                    scalar,
                    ticks: 450,
                    zIndex,
                })
            }
        },
        []
    )

    return { fireConfetti }
}
