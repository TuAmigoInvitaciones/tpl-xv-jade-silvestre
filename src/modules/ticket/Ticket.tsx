import React, { useEffect } from 'react'
import { TicketHeader } from './components/TicketHeader'
import { TicketBody } from './components/TicketBody'
import { TicketFooter } from './components/TicketFooter'
import { TicketTableSection } from './components/TicketTableSection'
import { TicketNotice } from './components/TicketNotice'
import { useTicket } from '@/common/hooks'
import './_ticket.scss'

export const Ticket: React.FC = () => {
    const { ticket, onGetTicket, onCheckInitialData } = useTicket()

    useEffect(() => {
        const storedTicketStr = localStorage.getItem('abrasa-ticket')
        const currentTicket = ticket || (storedTicketStr ? JSON.parse(storedTicketStr) : null)

        if (currentTicket?.keyPass) {
            onGetTicket(currentTicket.keyPass)
        } else {
            onCheckInitialData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onGetTicket, onCheckInitialData])

    return (
        <div className="ticket">
            <div className="ticket__container">
                <div className="ticket__content">
                    <TicketHeader />

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    {ticket && <TicketBody ticket={ticket} />}

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    <TicketTableSection ticket={ticket} />

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    <TicketNotice />

                    <div className="ticket__divider">
                        <div className="ticket__dashed-line" />
                    </div>

                    {ticket && <TicketFooter ticket={ticket} />}
                </div>
            </div>
        </div>
    )
}
