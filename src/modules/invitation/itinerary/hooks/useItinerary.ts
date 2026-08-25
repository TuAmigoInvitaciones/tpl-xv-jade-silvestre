import { useEffect, useRef } from 'react'
import { useInvitationConfig, useScrollTimeline, useConfetti } from '@/common/hooks'

import iconCeremonia from '@/assets/images/icons/icon-ceremonia.svg'
import iconRecepcion from '@/assets/images/icons/icon-recepcion.svg'
import iconCoctel from '@/assets/images/icons/icon-coctel.svg'
import iconCena from '@/assets/images/icons/icon-cena.svg'
import iconVals from '@/assets/images/icons/icon-vals.svg'
import iconApertura from '@/assets/images/icons/icon-apertura.svg'
import iconBanda from '@/assets/images/icons/icon-banda.svg'
import iconFin from '@/assets/images/icons/icon-fin.svg'

const ICON_MAP: Record<string, string> = {
    ceremonia: iconCeremonia,
    recepcion: iconRecepcion,
    coctel: iconCoctel,
    cena: iconCena,
    vals: iconVals,
    apertura: iconApertura,
    banda: iconBanda,
    fin: iconFin,
}

export const getAmenityIcon = (item: { time: string; event: string; icon?: string }): string | null => {
    if (item.icon) {
        const key = item.icon.toLowerCase().replace(/^icon-/, '').replace(/\.svg$/, '').trim()
        if (ICON_MAP[key]) return ICON_MAP[key]
    }

    const eventName = item.event.toLowerCase()
    if (eventName.includes('ceremonia')) return ICON_MAP.ceremonia
    if (eventName.includes('recep') || eventName.includes('fiesta')) return ICON_MAP.recepcion
    if (eventName.includes('coct') || eventName.includes('bienvenida')) return ICON_MAP.coctel
    if (eventName.includes('cena')) return ICON_MAP.cena
    if (eventName.includes('vals') || eventName.includes('brindis')) return ICON_MAP.vals
    if (eventName.includes('apertura') || eventName.includes('pista')) return ICON_MAP.apertura
    if (eventName.includes('banda') || eventName.includes('música') || eventName.includes('musica')) return ICON_MAP.banda
    if (eventName.includes('fin')) return ICON_MAP.fin

    return null
}

export interface ItineraryItem {
    time: string
    event: string
    icon?: string
    iconSrc?: string | null
}

export const useItinerary = () => {
    const { sections } = useInvitationConfig()
    const itineraryConfig = sections.itinerary
    const { fireConfetti } = useConfetti()
    const hasFiredConfetti = useRef(false)

    const showItinerary = Boolean(itineraryConfig?.showItinerary)

    const itineraryItems = ((itineraryConfig?.itinerary as ItineraryItem[]) || [])
        .filter((item: ItineraryItem) => item.event && item.event !== '-1')
        .map((item: ItineraryItem) => ({
            ...item,
            iconSrc: getAmenityIcon(item),
        }))

    const { gridRef, setItemRef, activeIndex, iconTop } = useScrollTimeline({
        itemCount: itineraryItems.length,
    })

    useEffect(() => {
        const isLastItem = activeIndex === itineraryItems.length - 1
        if (isLastItem && itineraryItems.length > 0) {
            if (!hasFiredConfetti.current) {
                hasFiredConfetti.current = true
                fireConfetti({
                    preset: 'side-cannons',
                    particleCount: 150,
                    colors: ['#384001', '#b3bf5a', '#f2f2eb', '#fee0ef', '#8c8072', '#C29F53', '#9CB08D'],
                })
            }
        } else {
            hasFiredConfetti.current = false
        }
    }, [activeIndex, itineraryItems.length, fireConfetti])

    return {
        showItinerary,
        itineraryItems,
        gridRef,
        setItemRef,
        activeIndex,
        iconTop,
    }
}

