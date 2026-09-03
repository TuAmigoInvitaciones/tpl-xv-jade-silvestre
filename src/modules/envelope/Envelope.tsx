import React, { useState, useEffect } from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { EnvelopeInteractive } from './EnvelopeInteractive'
import { EnvelopeVideo } from './EnvelopeVideo'
import type { EnvelopeConfig } from '@/common/types'

export const Envelope: React.FC = () => {
    const { sections } = useInvitationConfig()
    const envelopConfig = (sections.envelop || sections.envelope) as EnvelopeConfig | undefined
    const envelopeType = envelopConfig?.type || 'cerrado-abierto'

    const [isDesktop, setIsDesktop] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768
        }
        return false
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)')
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDesktop(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    if (envelopeType === 'video-apertura') {
        if (isDesktop) {
            return <EnvelopeInteractive />
        }

        return (
            <EnvelopeVideo />
        )
    }

    return <EnvelopeInteractive />
}

