import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const ScratchCardSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const config = sections.scratchReveal

    // Hook preparado para la logica del lienzo rascable
    // const scratchCard = useScratchCard()

    if (!config?.showScratchReveal) {
        return null
    }

    return (
        <section id="scratch-card" className="scratch-card-section">
            <div className="scratch-card-section__container">
                {/* Skeleton para el componente rascable */}
            </div>
        </section>
    )
}
