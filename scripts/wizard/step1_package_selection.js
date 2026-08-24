import pc from 'picocolors'
import { askSelect, askConfirm, ask, printSectionTitle } from './prompts.js'

export async function promptPackageSelection(preselectedEventType) {
    printSectionTitle('1. Tipo de Evento & Paquete Comercial')

    // 1. Tipo de Evento (si fue seleccionado en el paso 0 se reutiliza)
    let eventType = preselectedEventType
    if (!eventType) {
        eventType = await askSelect('1. Selecciona el Tipo de Evento:', [
            { label: 'Boda', value: 'wedding' },
            { label: 'XV Años', value: 'xv' },
            { label: 'Graduación', value: 'graduation' },
            { label: 'Fiesta Infantil', value: 'kids' },
            { label: 'Bautizo', value: 'bautizo' },
            { label: 'General / Cumpleaños / Otro', value: 'general' },
        ])
    }

    let packageTier = 'platino'
    let hasPhotos = false
    let basePrice = 0
    let packageName = ''

    let isInfantPackage = eventType === 'kids'
    if (eventType === 'bautizo') {
        isInfantPackage = await askConfirm('¿Es paquete de línea Infantil (Esmeralda $199.99 / Cuarzo $399.99)?', true)
    }

    if (isInfantPackage) {
        packageTier = await askSelect('2. Paquete de Línea Infantil:', [
            { label: 'Esmeralda ($199.99) - Básica / Temática (Sobre + Portada + Ubicación GPS + RSVP WhatsApp)', value: 'esmeralda' },
            { label: 'Cuarzo ($399.99) - Premium / Formal (Scratch Reveal + Cuenta Regresiva + Galería + Regalos + RSVP)', value: 'cuarzo' },
        ])

        if (packageTier === 'esmeralda') {
            packageName = 'Esmeralda (Básica / Temática)'
            basePrice = 199.99
            hasPhotos = false
        } else {
            packageName = 'Cuarzo (Premium / Formal)'
            basePrice = 399.99
            hasPhotos = true
        }
    } else {
        // 2. Selección de Línea Visual (Con Fotos vs Sin Fotos)
        const visualLine = await askSelect('2. Selecciona la Línea Visual de la Invitación:', [
            { label: 'Línea CON Fotos (Incluye fotografías de sesión / galería)', value: 'con_fotos' },
            { label: 'Línea SIN Fotos (Diseño enfocado en tipografía e ilustraciones sin fotos)', value: 'sin_fotos' },
        ])
        hasPhotos = visualLine === 'con_fotos'

        const options = hasPhotos
            ? [
                { label: 'Bronce ($699.99) - Esencial Con Fotos (Logística + Itinerario + Save The Date + RSVP WhatsApp/Llamada)', value: 'bronce' },
                { label: 'Platino ($899.99) - Intermedio Con Fotos (Secciones completas + Familia + Mesa de Regalos + Plataforma Abrasa RSVP)', value: 'platino' },
                { label: 'Oro ($1,099.99) - VIP Premium Con Fotos (Plataforma Abrasa Pro + Scratch Reveal + Álbum QR + Monograma)', value: 'oro' },
                { label: 'Rubí ($1,899.00) - A la Medida Cero Plantilla Con Fotos (Diseño 100% único)', value: 'rubi' },
            ]
            : [
                { label: 'Bronce ($499.99) - Esencial Sin Fotos (Logística + Itinerario + Save The Date + RSVP WhatsApp/Llamada)', value: 'bronce' },
                { label: 'Platino ($699.99) - Intermedio Sin Fotos (Secciones completas + Familia + Mesa de Regalos + Plataforma Abrasa RSVP)', value: 'platino' },
                { label: 'Oro ($899.99) - VIP Premium Sin Fotos (Plataforma Abrasa Pro + Scratch Reveal + Álbum QR + Monograma)', value: 'oro' },
                { label: 'Rubí ($1,599.00) - A la Medida Cero Plantilla Sin Fotos (Diseño 100% único)', value: 'rubi' },
            ]

        packageTier = await askSelect('3. Selecciona el Nivel del Paquete:', options)

        const photoLabel = hasPhotos ? 'Con Fotos' : 'Sin Fotos'

        if (packageTier === 'bronce') {
            basePrice = hasPhotos ? 699.99 : 499.99
            packageName = `Bronce Esencial (${photoLabel})`
        } else if (packageTier === 'platino') {
            basePrice = hasPhotos ? 899.99 : 699.99
            packageName = `Platino Intermedio (${photoLabel})`
        } else if (packageTier === 'oro') {
            basePrice = hasPhotos ? 1099.99 : 899.99
            packageName = `Oro VIP Premium (${photoLabel})`
        } else {
            basePrice = hasPhotos ? 1899.00 : 1599.00
            packageName = `Rubí A la Medida (${photoLabel})`
        }
    }

    // 3. Módulo de Boletaje Electrónico QR
    let hasTicketingSystem = false
    let ticketCount = 0
    let pricePerTicket = 0
    let ticketTotalPrice = 0
    let hasTableAssignment = false

    if (eventType === 'graduation') {
        hasTicketingSystem = true
    } else {
        hasTicketingSystem = await askConfirm('🎟️ ¿Deseas incluir Módulo Adicional de Boletaje Electrónico QR?', false)
    }

    if (hasTicketingSystem) {
        const countStr = await ask('   -> Cantidad estimada de boletos / pases', '100')
        ticketCount = parseInt(countStr, 10) || 100

        if (ticketCount <= 100) pricePerTicket = 10.0
        else if (ticketCount <= 300) pricePerTicket = 9.0
        else if (ticketCount <= 500) pricePerTicket = 8.0
        else if (ticketCount <= 700) pricePerTicket = 6.0
        else pricePerTicket = 5.0

        ticketTotalPrice = ticketCount * pricePerTicket
        hasTableAssignment = await askConfirm('   -> ¿Incluir asignación de mesas y croquis interactivo de lugar?', true)
    }

    // 4. Módulos Extra Add-ons ($150.00 c/u)
    const includedAddons = {
        monogram: packageTier === 'oro' || packageTier === 'rubi',
    }

    const selectedAddons = {
        lodgingAndWeather: false,
        ourStory: false,
        faqAndMenu: false,
        playlistAndPhotos: false,
        monogram: Boolean(includedAddons.monogram),
    }

    const extraPaidAddons = {
        lodgingAndWeather: false,
        ourStory: false,
        faqAndMenu: false,
        playlistAndPhotos: false,
        monogram: false,
    }

    const includeAddons = await askConfirm('4. ¿Deseas agregar algún Módulo Extra Add-on ($150.00 c/u)?', false)

    if (includeAddons) {
        let keepSelecting = true
        while (keepSelecting) {
            const addonChoice = await askSelect('   -> Selecciona el Add-on a incluir:', [
                { label: `1. Hospedaje & Clima ($150.00) ${selectedAddons.lodgingAndWeather ? '[ACTIVADO]' : ''}`, value: 'lodgingAndWeather' },
                { label: `2. Nuestra Historia / Cita ($150.00) ${selectedAddons.ourStory ? '[ACTIVADO]' : ''}`, value: 'ourStory' },
                { label: `3. Preguntas Frecuentes & Menú ($150.00) ${selectedAddons.faqAndMenu ? '[ACTIVADO]' : ''}`, value: 'faqAndMenu' },
                { label: `4. Playlist & Carga de Fotos de Invitados ($150.00) ${selectedAddons.playlistAndPhotos ? '[ACTIVADO]' : ''}`, value: 'playlistAndPhotos' },
                { label: `5. Monograma Exclusivo ($150.00) ${selectedAddons.monogram ? (includedAddons.monogram ? '[INCLUIDO EN PAQUETE]' : '[ACTIVADO]') : ''}`, value: 'monogram' },
                { label: '6. Terminar selección de Add-ons', value: 'done' },
            ])

            if (addonChoice === 'done') {
                keepSelecting = false
            } else if (addonChoice === 'monogram' && includedAddons.monogram) {
                console.log(pc.yellow('   -> El Monograma Exclusivo ya está INCLUIDO sin costo adicional en tu paquete ' + packageTier.toUpperCase()))
            } else {
                extraPaidAddons[addonChoice] = !extraPaidAddons[addonChoice]
                selectedAddons[addonChoice] = extraPaidAddons[addonChoice] || Boolean(includedAddons[addonChoice])
                const status = selectedAddons[addonChoice] ? 'Activado' : 'Desactivado'
                console.log(`${pc.green('   ✓ ' + status + ': ' + addonChoice)}`)
            }
        }
    }

    const extraAddonsCount = Object.values(extraPaidAddons).filter(Boolean).length
    const addonsTotalPrice = extraAddonsCount * 150.0

    // 5. Secciones Progresivas según Paquete
    const isBronce = packageTier === 'bronce'
    const isEsmeralda = packageTier === 'esmeralda'
    const showGallery = hasPhotos && packageTier !== 'esmeralda'

    const sectionToggles = {
        showHero: true,
        showScratchReveal: packageTier === 'oro' || packageTier === 'rubi' || packageTier === 'cuarzo',
        showCountdown: true, // Incluido en TODOS los paquetes (Save The Date + Conteo)
        showMessage: true,
        showFamily: !isBronce && (eventType === 'wedding' || eventType === 'xv' || eventType === 'bautizo'),
        showPlaces: true,
        showGraduates: eventType === 'graduation',
        showDressCode: !isEsmeralda,
        showItinerary: true, // Incluido en Bronce, Platino, Oro, Rubí y Cuarzo
        showDetails: true,
        showGallery,
        showPresents: !isBronce && !isEsmeralda,
        showConfirmation: true,
        showFarewell: !isBronce,
        showTicket: hasTicketingSystem,
    }

    return {
        eventType,
        packageTier,
        hasPhotos,
        commercial: {
            packageName,
            basePrice,
            ticketPrice: ticketTotalPrice,
            addonsPrice: addonsTotalPrice,
            totalPrice: basePrice + ticketTotalPrice + addonsTotalPrice,
        },
        hasTicketingSystem,
        selectedAddons,
        sectionToggles,
    }
}
