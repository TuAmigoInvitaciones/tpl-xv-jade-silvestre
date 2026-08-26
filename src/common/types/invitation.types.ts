export interface EnvelopConfig {
    showEnvelop?: boolean
    type?: 'cerrado-abierto' | 'video-apertura' | 'animacion-apertura'
    [key: string]: unknown
}


export interface ConfirmationSectionConfig {
    showConfirmation?: boolean
    type?: 'abrasa' | 'whatsapp' | 'phone call'
    isQuantityFree?: boolean
    whatsappPhone?: string
    whatsappMessage?: string
    [key: string]: unknown
}
import type { ButtonVariant } from './button.types'
import type { MenuVariant } from './menu.types'
import type { MusicPlayerVariant } from './music-player.types'

export type EventType = 'wedding' | 'graduation' | 'xv' | 'general'

export interface UIConfig {
    menu?: {
        show?: boolean
        variant?: MenuVariant
        title?: string
        buttonVariant?: ButtonVariant
    }
    music?: {
        show?: boolean
        variant?: MusicPlayerVariant
        buttonVariant?: ButtonVariant
        songTitle?: string
        artistName?: string
    }
}

export interface ThemeConfig {
    fontPack: number
    palette: number
    buttonVariant?: ButtonVariant
    menu?: UIConfig['menu']
    music?: UIConfig['music']
}

export interface SectionItemConfig {
    title?: string
    [key: string]: unknown
}

export interface LocationItem {
    title?: string
    venue?: string
    location?: string
    time?: string
    date?: string
    url?: string
    showPhotos?: boolean
    showVideo?: boolean
    note?: string
    [key: string]: unknown
}

export interface ScratchRevealConfig {
    showScratchReveal?: boolean
    bgImage?: string
    scratchImage?: string
    hiddenText?: string
    [key: string]: unknown
}

export interface LodgingItem {
    name?: string
    address?: string
    phone?: string
    rateInfo?: string
}

export interface LodgingAndWeatherConfig {
    showLodging?: boolean
    title?: string
    hotels?: LodgingItem[]
    weatherCity?: string
    [key: string]: unknown
}

export interface TimelineItem {
    date?: string
    title?: string
    description?: string
}

export interface OurStoryConfig {
    showOurStory?: boolean
    title?: string
    quoteOrPoem?: string
    timeline?: TimelineItem[]
    [key: string]: unknown
}

export interface FaqItem {
    question?: string
    answer?: string
}

export interface MenuCourseItem {
    course?: string
    name?: string
    description?: string
}

export interface FaqAndMenuConfig {
    showFaqAndMenu?: boolean
    title?: string
    faqs?: FaqItem[]
    menuCourses?: MenuCourseItem[]
    [key: string]: unknown
}

export interface PlaylistAndPhotosConfig {
    showPlaylistAndPhotos?: boolean
    title?: string
    playlistUrl?: string
    qrAlbumUrl?: string
    [key: string]: unknown
}

export interface MonogramConfig {
    showMonogram?: boolean
    title?: string
    monogramImage?: string
    initials?: string
    [key: string]: unknown
}

export interface AddonsConfig {
    lodgingAndWeather?: LodgingAndWeatherConfig
    ourStory?: OurStoryConfig
    faqAndMenu?: FaqAndMenuConfig
    playlistAndPhotos?: PlaylistAndPhotosConfig
    monogram?: MonogramConfig
    [key: string]: unknown
}

export interface SectionsConfig {
    hero?: SectionItemConfig & { showHero?: boolean; names?: string; subtitle?: string; date?: string }
    scratchReveal?: ScratchRevealConfig
    message?: SectionItemConfig & { showMessage?: boolean; message?: string }
    countdown?: SectionItemConfig & { showCountdown?: boolean; targetDate?: string }
    family?: SectionItemConfig & { showFamily?: boolean }
    places?: SectionItemConfig & { showPlaces?: boolean; locations?: LocationItem[] }
    graduates?: SectionItemConfig & { showGraduates?: boolean }
    itinerary?: SectionItemConfig & { 
        showItinerary?: boolean;
        itinerary?: Array<{ time?: string; event?: string }>
    }
    dressCode?: SectionItemConfig & { 
        showDressCode?: boolean; 
        title?: string;
        description?: string;
        attire?: { men?: string; women?: string };
        colors?: { suggested?: string[]; avoid?: string[] }
    }
    details?: SectionItemConfig & { showDetails?: boolean }
    gallery?: SectionItemConfig & { showGallery?: boolean }
    guestPhotos?: SectionItemConfig & { showGuestPhotos?: boolean; title?: string; subtitle?: string }

    presents?: SectionItemConfig & {
        showPresents?: boolean
        title?: string
        url?: string
        bankDetails?: {
            bank?: string
            holder?: string
            clabe?: string
            account?: string
        }
        envelopeRain?: boolean
    }

    confirmation?: ConfirmationSectionConfig
    rsvp?: SectionItemConfig & { showRsvp?: boolean }
    farewell?: SectionItemConfig & { showFarewell?: boolean }
    ticket?: SectionItemConfig & { showTicket?: boolean }
    addons?: AddonsConfig
    [key: string]: unknown
}

export interface InvitationConfigState {
    eventType?: EventType
    theme: ThemeConfig
    ui?: UIConfig
    config: Record<string, boolean>
    sections: SectionsConfig
}
