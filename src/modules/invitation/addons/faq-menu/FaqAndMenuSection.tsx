import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const FaqAndMenuSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const config = sections.addons?.faqAndMenu

    if (!config?.showFaqAndMenu) {
        return null
    }

    return (
        <section id="faq-menu" className="faq-menu-section">
            <div className="faq-menu-section__container">
                {/* Skeleton vacio para maquetacion futura */}
            </div>
        </section>
    )
}
