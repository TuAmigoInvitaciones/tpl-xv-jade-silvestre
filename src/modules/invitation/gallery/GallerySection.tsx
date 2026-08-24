import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

export const GallerySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const galleryConfig = sections.gallery

    if (!galleryConfig?.showGallery) {
        return null
    }

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-section__container">
                <SectionHeader
                    pretitle="MOMENTOS ESPECIALES"
                    title="Galería de Fotos"
                    align="center"
                    variant="uppercase"
                />

                <div className="gallery-section__content">
                    {/* Contenedor preparado para slider, collage o mosaico de fotos */}
                </div>
            </div>
        </section>
    )
}
