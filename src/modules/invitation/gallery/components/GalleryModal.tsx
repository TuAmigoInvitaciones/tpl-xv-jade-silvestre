import React from 'react'
import { Modal } from '@/common/components/modal/Modal'
import { useModal } from '@/common/hooks'

export const GalleryModal: React.FC = () => {
    const { modalContent } = useModal()

    return (
        <Modal size="lg">
            <div className="gallery-modal">
                <img
                    src={modalContent}
                    alt="Fotografía ampliada"
                    className="gallery-modal__img"
                />
            </div>
        </Modal>
    )
}
