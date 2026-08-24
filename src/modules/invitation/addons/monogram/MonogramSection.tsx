import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const MonogramSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const config = sections.addons?.monogram

    if (!config?.showMonogram) {
        return null
    }

    return (
        <section id="monogram" className="monogram-section">
            <div className="monogram-section__container">
                {/* Skeleton vacio para maquetacion futura */}
            </div>
        </section>
    )
}
