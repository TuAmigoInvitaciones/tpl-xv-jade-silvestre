import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const GuestPhotosSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const config = sections.addons?.playlistAndPhotos

    if (!config?.showPlaylistAndPhotos) {
        return null
    }

    return (
        <section id="guest-photos" className="guest-photos-section">
            <div className="guest-photos-section__container">
                {/* Skeleton vacio para maquetacion futura */}
            </div>
        </section>
    )
}
