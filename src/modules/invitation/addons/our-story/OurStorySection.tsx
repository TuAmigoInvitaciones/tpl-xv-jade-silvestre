import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const OurStorySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const config = sections.addons?.ourStory

    if (!config?.showOurStory) {
        return null
    }

    return (
        <section id="our-story" className="our-story-section">
            <div className="our-story-section__container">
                {/* Skeleton vacio para maquetacion futura */}
            </div>
        </section>
    )
}
