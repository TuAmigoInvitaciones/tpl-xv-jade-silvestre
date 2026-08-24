import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const PresentsSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const presentsConfig = sections.presents

    if (!presentsConfig?.showPresents) {
        return null
    }

    return (
        <section id="presents" className="presents-section">
            <div className="presents-section__container">
                <SectionHeader
                    pretitle="SUGERENCIA DE REGALOS"
                    title={presentsConfig.title || 'Mesa de Regalos'}
                    align="center"
                    variant="uppercase"
                />

                <div className="presents-section__content">
                    {/* Contenedor preparado para mesa de regalos, lluvia de sobres o transferencia */}
                </div>
            </div>
        </section>
    )
}
