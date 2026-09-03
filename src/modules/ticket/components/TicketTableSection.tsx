import React from 'react'
import { ArmchairIcon } from '@phosphor-icons/react'
import { useModal } from '@/common/hooks/useModal'
import { MODAL_NAMES } from '@/store/ui/modal.slice'
import { Button } from '@/common/components/button/Button'
import type { Ticket } from '@/common/types/ticket.types'

interface Props {
    ticket?: Ticket | null
}

export const TicketTableSection: React.FC<Props> = ({ ticket }) => {
    const { onOpenModal } = useModal()
    const tableInfo = ticket?.table || 'Mesa 1'

    return (
        <div className="ticket__table-section">
            <div className="ticket__table-card">
                <span className="ticket__table-label">Mesa Asignada</span>
                <span className="ticket__table-value">{tableInfo}</span>
            </div>

            <div className="ticket__button no-print">
                <Button
                    variant="secondary"
                    radius="full"
                    icon={<ArmchairIcon size={20} weight="thin" />}
                    onClick={() => onOpenModal(MODAL_NAMES.tables, 'Distribución de Mesas')}
                    className="ticket__tables-btn"
                >
                    Ver Mesas
                </Button>
            </div>
        </div>
    )
}
