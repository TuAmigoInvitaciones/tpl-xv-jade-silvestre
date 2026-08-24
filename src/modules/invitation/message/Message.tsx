import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const MessageSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const messageConfig = sections.message

    if (messageConfig?.showMessage === false) {
        return null
    }

    const messageText = messageConfig?.message || ''

    return (
        <section id="message" className="message-section">
            <div className="message-section__container">
                {messageText && <p className="message-section__text">{messageText}</p>}
            </div>
        </section>
    )
}
