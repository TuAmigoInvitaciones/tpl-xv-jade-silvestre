import React from 'react'
import { TicketIcon, WhatsappLogoIcon, ShieldCheckIcon, HeadsetIcon } from '@phosphor-icons/react'
import { Modal } from '@/common/components/modal/Modal'

export const SearchModal: React.FC = () => {
    return (
        <Modal size="md">
            <div className="search-modal">
                <div className="search-modal__item">
                    <TicketIcon size={24} weight="duotone" />
                    <div className="search-modal__item-text">
                        <strong>Clave Única requerida:</strong> Esta invitación requiere acceso por medio de una clave única para poder obtener sus boletos.
                    </div>
                </div>

                <div className="search-modal__item">
                    <WhatsappLogoIcon size={24} weight="duotone" />
                    <div className="search-modal__item-text">
                        <strong>Enviada por WhatsApp:</strong> Tu clave de acceso personal fue enviada a tu número de WhatsApp registrado o al de la persona titular del boleto.
                    </div>
                </div>

                <div className="search-modal__item">
                    <ShieldCheckIcon size={24} weight="duotone" />
                    <div className="search-modal__item-text">
                        <strong>Única e Intransferible:</strong> Esta clave es personal. Ten mucho cuidado de no compartirla con nadie para proteger tu pase.
                    </div>
                </div>

                <div className="search-modal__item">
                    <HeadsetIcon size={24} weight="duotone" />
                    <div className="search-modal__item-text">
                        <strong>Contacto y Soporte:</strong> Contacta al organizador de tu evento para que te la proporcione o te brinde soporte.
                    </div>
                </div>
            </div>
        </Modal>
    )
}
