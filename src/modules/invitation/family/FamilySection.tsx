import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const FamilySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const familyConfig = sections.family

    if (!familyConfig?.showFamily) {
        return null
    }

    return (
        <section id="family" className="family-section">
            <div className="family-section__container">
                <SectionHeader
                    pretitle="CON LA BENDICIÓN DE NUESTROS PADRES"
                    title="Nuestra Familia"
                    align="center"
                    variant="uppercase"
                />

                <div className="family-section__content">
                    {/* Contenedor preparado para maquetar la sección de familia/padrinos */}
                </div>
            </div>
        </section>
    )
}
