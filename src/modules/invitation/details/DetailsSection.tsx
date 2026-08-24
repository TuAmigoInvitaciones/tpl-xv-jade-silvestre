import React from 'react'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const DetailsSection: React.FC = () => {
    return (
        <section id="details" className="details-section">
            <div className="details-section__container">
                <SectionHeader
                    pretitle="NOTAS IMPORTANTES"
                    title="Recordatorios"
                    align="center"
                    variant="uppercase"
                />

                <div className="details-section__content">
                    {/* Contenedor preparado para agregar tarjetas o notas de recordatorios */}
                </div>
            </div>
        </section>
    )
}
