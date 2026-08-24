import { useRef, useEffect, useState, useCallback } from 'react'
import { useConfetti } from './useConfetti'

export interface UseScratchCardOptions {
    brushSize?: number
    revealPercent?: number
    shape?: 'heart' | 'rect'
    foilColor?: string
    confettiParticleCount?: number
    confettiColors?: string[]
    onReveal?: () => void
    disabled?: boolean
}

export const useScratchCard = ({
    brushSize = 28,
    revealPercent = 45,
    shape = 'heart',
    foilColor = 'white',
    confettiParticleCount = 500,
    confettiColors,
    onReveal,
    disabled = false,
}: UseScratchCardOptions = {}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [isRevealed, setIsRevealed] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const lastPointRef = useRef<{ x: number; y: number } | null>(null)

    const { fireConfetti } = useConfetti()

    const initCanvas = useCallback(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const rect = container.getBoundingClientRect()
        const width = rect.width || 300
        const height = rect.height || 260

        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr
        canvas.height = height * dpr

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.scale(dpr, dpr)
        ctx.clearRect(0, 0, width, height)

        ctx.save()

        if (shape === 'heart') {
            ctx.beginPath()
            ctx.moveTo(width * 0.5, height * 0.28)
            ctx.bezierCurveTo(
                width * 0.48, height * 0.12,
                width * 0.34, height * 0.04,
                width * 0.20, height * 0.04
            )
            ctx.bezierCurveTo(
                width * 0.06, height * 0.04,
                0, height * 0.16,
                0, height * 0.34
            )
            ctx.bezierCurveTo(
                0, height * 0.58,
                width * 0.26, height * 0.79,
                width * 0.5, height * 0.98
            )
            ctx.bezierCurveTo(
                width * 0.74, height * 0.79,
                width, height * 0.58,
                width, height * 0.34
            )
            ctx.bezierCurveTo(
                width, height * 0.16,
                width * 0.94, height * 0.04,
                width * 0.80, height * 0.04
            )
            ctx.bezierCurveTo(
                width * 0.66, height * 0.04,
                width * 0.52, height * 0.12,
                width * 0.5, height * 0.28
            )
            ctx.closePath()
            ctx.clip()
        }

        const isWhiteOrDefault = foilColor === 'white' || !foilColor
        if (isWhiteOrDefault) {
            const gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#fef7f5')
            gradient.addColorStop(0.5, '#f9ebe6')
            gradient.addColorStop(1, '#f4ded7')
            ctx.fillStyle = gradient
        } else {
            ctx.fillStyle = foilColor
        }

        if (shape === 'rect') {
            ctx.fillRect(0, 0, width, height)
        } else {
            ctx.fill()
        }

        ctx.restore()
    }, [foilColor, shape])

    useEffect(() => {
        initCanvas()

        const handleResize = () => {
            if (!isRevealed) {
                initCanvas()
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [initCanvas, isRevealed])

    const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()
        let clientX = 0
        let clientY = 0

        if ('touches' in e && e.touches.length > 0) {
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        } else if ('clientX' in e) {
            clientX = e.clientX
            clientY = e.clientY
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        }
    }

    const scratchLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineWidth = brushSize * 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
    }

    const checkPercentage = useCallback(() => {
        if (isRevealed) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const width = canvas.width
        const height = canvas.height

        const sampleStep = 8 * dpr
        const imageData = ctx.getImageData(0, 0, width, height)
        const pixels = imageData.data

        let transparentCount = 0
        let totalSamples = 0

        for (let y = 0; y < height; y += sampleStep) {
            for (let x = 0; x < width; x += sampleStep) {
                const index = (y * width + x) * 4
                const alpha = pixels[index + 3]
                if (alpha < 128) {
                    transparentCount++
                }
                totalSamples++
            }
        }

        const currentPercent = (transparentCount / totalSamples) * 100

        if (currentPercent >= revealPercent) {
            setIsRevealed(true)
            fireConfetti({
                particleCount: confettiParticleCount,
                colors: confettiColors ?? ['#4a4933', '#6b6b47', '#9a9180', '#5e6047', '#f5f8e5', '#e6dfd3'],
                preset: 'side-cannons',
            })
            if (onReveal) {
                onReveal()
            }
        }
    }, [isRevealed, revealPercent, confettiParticleCount, confettiColors, onReveal, fireConfetti])

    const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
        if (disabled || isRevealed) return
        setIsDrawing(true)
        setHasStarted(true)
        const pos = getPos(e)
        lastPointRef.current = pos
        scratchLine(pos, pos)
    }

    const moveScratch = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || disabled || isRevealed) return
        const currentPos = getPos(e)
        if (lastPointRef.current) {
            scratchLine(lastPointRef.current, currentPos)
        }
        lastPointRef.current = currentPos
    }

    const stopScratch = () => {
        if (!isDrawing) return
        setIsDrawing(false)
        lastPointRef.current = null
        checkPercentage()
    }

    return {
        containerRef,
        canvasRef,
        isRevealed,
        hasStarted,
        startScratch,
        moveScratch,
        stopScratch,
    }
}
