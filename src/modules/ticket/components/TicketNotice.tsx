import React from 'react'
import { TicketIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import { Button } from '@/common/components/button/Button'

export const TicketNotice: React.FC = () => {
    const handleDownloadPdf = () => {
        window.print()
    }

    return (
        <div className="ticket__notice-container">
            <div className="ticket__notice">
                <TicketIcon size={22} weight="thin" className="ticket__notice-icon" />
                <p className="ticket__notice-text">
                    Es indispensable presentar este boleto digital en la recepción del evento para el ingreso.
                </p>
            </div>

            <div className="ticket__download-box no-print">
                <Button
                    variant="outline"
                    onClick={handleDownloadPdf}
                    icon={<DownloadSimpleIcon size={20} weight="bold" />}
                    className="ticket__download-btn"
                >
                    Descargar Boleto PDF
                </Button>
            </div>
        </div>
    )
}
