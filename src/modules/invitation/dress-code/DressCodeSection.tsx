import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const DressCodeSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const dressCodeConfig = sections.dressCode

    if (!dressCodeConfig?.showDressCode) {
        return null
    }

    return (
        <section id="dress-code" className="dress-code-section">
            <div className="dress-code-section__container">
                <SectionHeader
                    pretitle="CÓDIGO DE VESTIMENTA"
                    title={dressCodeConfig.title || 'Dress Code'}
                    align="center"
                    variant="uppercase"
                />

                <div className="dress-code-section__content">
                    {/* Contenedor preparado para vestimenta, colores sugeridos y prendas a evitar */}
                </div>
            </div>
        </section>
    )
}
