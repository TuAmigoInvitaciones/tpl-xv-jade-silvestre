import React, { useEffect } from 'react'
import { useConfetti } from '@/common/hooks'
import type { ConfettiOptions } from '@/common/hooks'

export interface ConfettiProps extends ConfettiOptions {
    triggerOnMount?: boolean
}

export const Confetti: React.FC<ConfettiProps> = ({ triggerOnMount = true, ...options }) => {
    const { fireConfetti } = useConfetti()

    useEffect(() => {
        if (triggerOnMount) {
            fireConfetti(options)
        }
    }, [triggerOnMount, fireConfetti, options])

    return null
}
