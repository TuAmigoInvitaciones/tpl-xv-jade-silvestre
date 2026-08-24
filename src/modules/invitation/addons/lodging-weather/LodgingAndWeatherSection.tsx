import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

export const LodgingAndWeatherSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const config = sections.addons?.lodgingAndWeather

    if (!config?.showLodging) {
        return null
    }

    return (
        <section id="lodging-weather" className="lodging-weather-section">
            <div className="lodging-weather-section__container">
                {/* Skeleton vacio para maquetacion futura */}
            </div>
        </section>
    )
}
