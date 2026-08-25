import React from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig, useModal } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { MagnifyingGlassPlusIcon } from '@phosphor-icons/react'
import { MODAL_NAMES } from '@/store/ui/modal.slice'

import photo1 from '@/assets/images/photos/9.jpg'
import photo2 from '@/assets/images/photos/4.jpeg'
import photo3 from '@/assets/images/photos/5.jpeg'
import photo4 from '@/assets/images/photos/6.jpeg'
import photo5 from '@/assets/images/photos/11.jpg'
import photo6 from '@/assets/images/photos/10.jpg'

interface GalleryItem {
    id: number
    src: string
    alt: string
    modifier: string
}

const GALLERY_ITEMS: GalleryItem[] = [
    { id: 1, src: photo1, alt: 'Fotografía Quinceañera 1', modifier: 'gallery-section__tile--1' },
    { id: 2, src: photo2, alt: 'Fotografía Quinceañera 2', modifier: 'gallery-section__tile--2' },
    { id: 3, src: photo3, alt: 'Fotografía Quinceañera 3', modifier: 'gallery-section__tile--3' },
    { id: 4, src: photo4, alt: 'Fotografía Quinceañera 4', modifier: 'gallery-section__tile--4' },
    { id: 5, src: photo5, alt: 'Fotografía Quinceañera 5', modifier: 'gallery-section__tile--5' },
    { id: 6, src: photo6, alt: 'Fotografía Quinceañera 6', modifier: 'gallery-section__tile--6' },
]

export const GallerySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const { onOpenModal, onSetModalContent } = useModal()
    const galleryConfig = sections.gallery

    if (!galleryConfig?.showGallery) {
        return null
    }

    const handlePhotoClick = (item: GalleryItem) => {
        onSetModalContent(item.src)
        onOpenModal(MODAL_NAMES.gallery, 'Galería de Fotos')
    }

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-section__container">
                <SectionHeader
                    pretitle="Momentos Especiales"
                    title={galleryConfig.title || 'Galería de Fotos'}
                    align="center"
                />

                <div className="gallery-section__mosaic">
                    {GALLERY_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`gallery-section__tile ${item.modifier}`}
                            onClick={() => handlePhotoClick(item)}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="gallery-section__img"
                                loading="lazy"
                            />
                            <div className="gallery-section__overlay">
                                <div className="gallery-section__zoom-badge">
                                    <MagnifyingGlassPlusIcon size={22} weight="bold" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}




