import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTicket, useInvitationConfig } from '@/common/hooks'
import { LinkIcon } from '@phosphor-icons/react'

export const RsvpSection: React.FC = () => {
    const navigate = useNavigate()
    const { ticket } = useTicket()
    const { config, sections } = useInvitationConfig()

    const showTicketSystem = Boolean(config?.hasTicketingSystem || sections?.ticket?.showTicket)
    if (!showTicketSystem) return null

    const guestName = ticket?.name || ''
    const eventDate = sections.hero?.date || ''

    return (
        <section id="rsvp" className="rsvp">
            <div className="rsvp__container">
                <div className="rsvp__content">
                    <h3 className="rsvp__title">RSVP</h3>

                    {eventDate && <p className="rsvp__date">{eventDate}</p>}

                    {guestName && <h2 className="rsvp__guest-name">{guestName}</h2>}

                    <div className="rsvp__action">
                        <button
                            type="button"
                            className="rsvp__ticket-btn"
                            onClick={() => navigate('/ticket')}
                        >
                            <LinkIcon size={20} className="rsvp__ticket-btn-icon" />
                            <span>Ver mis boletos</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
