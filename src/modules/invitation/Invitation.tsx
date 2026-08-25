import React from 'react'
import { useMenu, useInvitationConfig } from '@/common/hooks'

import { HeroSection } from './hero/HeroSection'
import { ScratchCardSection } from './addons/scratch-card/ScratchCardSection'
import { CountdownSection } from './countdown/CountdownSection'
import { MessageSection } from './message/Message'
import { MonogramSection } from './addons/monogram/MonogramSection'
import { OurStorySection } from './addons/our-story/OurStorySection'
import { FamilySection } from './family/FamilySection'
import { PlacesSection } from './places/PlacesSection'
import { GraduatesSection } from './graduates/GraduatesSection'
import { LodgingAndWeatherSection } from './addons/lodging-weather/LodgingAndWeatherSection'
import { DressCodeSection } from './dress-code/DressCodeSection'
import { ItinerarySection } from './itinerary/ItinerarySection'
import { FaqAndMenuSection } from './addons/faq-menu/FaqAndMenuSection'
import { DetailsSection } from './details/DetailsSection'
import { GallerySection } from './gallery/GallerySection'
import { GuestPhotosSection } from './addons/guest-photos/GuestPhotosSection'
import { PresentsSection } from './presents/PresentsSection'
import { ConfirmationSection } from './confirmation/ConfirmationSection'
import { RsvpSection } from './rsvp/RsvpSection'
import { FarewellSection } from './farewell/FarewellSection'

export const Invitation: React.FC = () => {
    const { activeVariant, isMenuVisible } = useMenu()
    const { config } = useInvitationConfig()

    const hasMenuBarClass = isMenuVisible && activeVariant === 'bar' ? 'invitation--has-menu-bar' : ''
    const containerClass = `invitation ${hasMenuBarClass}`.trim()

    const showTicketSystem = Boolean(config?.hasTicketingSystem)

    return (
        <main className={containerClass}>
            <HeroSection />
            <ScratchCardSection />
            <MessageSection />
            <CountdownSection />
            <MonogramSection />
            <OurStorySection />
            {showTicketSystem && <RsvpSection />}
            <FamilySection />
            <PlacesSection />
            <GraduatesSection />
            <LodgingAndWeatherSection />
            <DressCodeSection />
            <ItinerarySection />
            <GallerySection />
            <PresentsSection />
            <FaqAndMenuSection />
            <DetailsSection />
            <GuestPhotosSection />
            <ConfirmationSection />
            <FarewellSection />
        </main>
    )
}
