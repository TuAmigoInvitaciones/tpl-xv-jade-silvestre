import React from 'react'
import { Modal } from '@/common/components/modal/Modal'
import { useModal } from '@/common/hooks/useModal'

export const TicketModal: React.FC = () => {
    const { modalContent } = useModal()

    return (
        <Modal>
            <div className="ticket__modal">
                <img src={modalContent} alt="Código QR ampliado" className="ticket__modal-image" />
            </div>
        </Modal>
    )
}
