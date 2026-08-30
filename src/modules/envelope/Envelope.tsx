import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { EnvelopeInteractive } from './EnvelopeInteractive'
import { EnvelopeVideo } from './EnvelopeVideo'
import type { EnvelopeConfig } from '@/common/types'

export const Envelope: React.FC = () => {
    const { sections } = useInvitationConfig()
    const envelopConfig = (sections.envelop || sections.envelope) as EnvelopeConfig | undefined
    const envelopeType = envelopConfig?.type || 'cerrado-abierto'

    if (envelopeType === 'video-apertura') {
        return <EnvelopeVideo />
    }

    return <EnvelopeInteractive />
}
