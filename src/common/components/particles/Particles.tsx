import React, { useEffect, useRef } from 'react'

export interface ParticlesProps {
    count?: number
    colors?: string[]
    minSize?: number
    maxSize?: number
    speed?: number
    variant?: 'glitter' | 'circles'
    direction?: 'down' | 'up' | 'float'
    className?: string
    zIndex?: number
}

interface Particle {
    x: number
    y: number
    size: number
    opacity: number
    opacitySpeed: number
    rotation: number
    rotationSpeed: number
    speedY: number
    speedX: number
    swayAngle: number
    swaySpeed: number
    color: string
    shape: 'star' | 'diamond' | 'spark'
}

export const Particles: React.FC<ParticlesProps> = ({
    count = 70,
    colors = ['#FFFFFF', '#FFF8DC', '#FFD700', '#D4AF37', '#F3E5AB', '#E6CA65', '#FFF3CD', '#E5E4E2', '#C0C0C0'],
    minSize = 1.5,
    maxSize = 4.5,
    speed = 0.9,
    variant = 'glitter',
    direction = 'down',
    className = '',
    zIndex = 2,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let width = 0
        let height = 0

        const handleResize = () => {
            const rect = canvas.getBoundingClientRect()
            const dpr = window.devicePixelRatio || 1
            width = rect.width
            height = rect.height

            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)
        }

        handleResize()

        const resizeObserver = new ResizeObserver(() => handleResize())
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement)
        }

        const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

        const shapes: ('star' | 'diamond' | 'spark')[] = ['star', 'diamond', 'spark', 'star']

        const particles: Particle[] = Array.from({ length: count }, () => ({
            x: Math.random() * (width || 300),
            y: Math.random() * (height || 300),
            size: minSize + Math.random() * (maxSize - minSize),
            opacity: 0.2 + Math.random() * 0.8,
            opacitySpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
            speedY: (0.4 + Math.random() * 0.8) * speed * (direction === 'up' ? -1 : 1),
            speedX: (Math.random() - 0.5) * 0.3,
            swayAngle: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.03,
            color: getRandomColor(),
            shape: shapes[Math.floor(Math.random() * shapes.length)],
        }))

        let isVisible = true

        const drawStar = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(rotation)
            ctx.globalAlpha = opacity
            ctx.fillStyle = color
            ctx.shadowColor = color
            ctx.shadowBlur = size * 3

            ctx.beginPath()
            const innerSize = size * 0.2
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI) / 2
                ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
                const halfAngle = angle + Math.PI / 4
                ctx.lineTo(Math.cos(halfAngle) * innerSize, Math.sin(halfAngle) * innerSize)
            }
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }

        const drawDiamond = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(rotation)
            ctx.globalAlpha = opacity
            ctx.fillStyle = color
            ctx.shadowColor = color
            ctx.shadowBlur = size * 2.5

            ctx.beginPath()
            ctx.moveTo(0, -size)
            ctx.lineTo(size * 0.5, 0)
            ctx.lineTo(0, size)
            ctx.lineTo(-size * 0.5, 0)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }

        const drawSpark = (x: number, y: number, size: number, color: string, opacity: number) => {
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.fillStyle = color
            ctx.shadowColor = color
            ctx.shadowBlur = size * 3
            ctx.beginPath()
            ctx.arc(x, y, size * 0.7, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
        }

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render)
                return
            }

            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                p.swayAngle += p.swaySpeed
                p.x += p.speedX + Math.sin(p.swayAngle) * 0.35
                p.y += p.speedY
                p.rotation += p.rotationSpeed

                // Rapid glitter opacity pulse (twinkle)
                p.opacity += p.opacitySpeed
                if (p.opacity >= 1.0 || p.opacity <= 0.15) {
                    p.opacitySpeed = -p.opacitySpeed
                    p.opacity = Math.max(0.15, Math.min(1.0, p.opacity))
                }

                if (direction === 'down' && p.y > height + 12) {
                    p.y = -12
                    p.x = Math.random() * width
                    p.color = getRandomColor()
                } else if (direction === 'up' && p.y < -12) {
                    p.y = height + 12
                    p.x = Math.random() * width
                    p.color = getRandomColor()
                }

                if (p.x > width + 12) p.x = -12
                if (p.x < -12) p.x = width + 12

                const currentOpacity = Math.max(0.1, Math.min(1.0, p.opacity))

                if (variant === 'glitter') {
                    if (p.shape === 'star') {
                        drawStar(p.x, p.y, p.size * 1.2, p.rotation, p.color, currentOpacity)
                    } else if (p.shape === 'diamond') {
                        drawDiamond(p.x, p.y, p.size, p.rotation, p.color, currentOpacity)
                    } else {
                        drawSpark(p.x, p.y, p.size, p.color, currentOpacity)
                    }
                } else {
                    drawSpark(p.x, p.y, p.size, p.color, currentOpacity)
                }
            }

            animationFrameId = requestAnimationFrame(render)
        }

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
            },
            { threshold: 0 }
        )

        intersectionObserver.observe(canvas)
        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
        }
    }, [count, colors, minSize, maxSize, speed, variant, direction])

    return (
        <canvas
            ref={canvasRef}
            className={`particles-canvas ${className}`.trim()}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex,
            }}
        />
    )
}
