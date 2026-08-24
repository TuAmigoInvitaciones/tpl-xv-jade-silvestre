import { ask, printSectionTitle } from './prompts.js'

export async function promptPlacesAndItinerary(eventDate = '20-11-2026', defaultTime = '17:00 HRS', showPlaces = true, showItinerary = true) {
    printSectionTitle('5. Ubicaciones & Itinerario de Eventos')

    // 1. Ubicaciones (Bucle Interactivo)
    const locationItems = []

    if (showPlaces) {
        console.log('\nConfiguración de Ubicaciones:')
        console.log('   (Agrega las ubicaciones que necesites. Escribe -1 en cualquiera de los campos para terminar)\n')

        let locCount = 1
        let keepAdding = true

        while (keepAdding) {
            console.log(`   --- Ubicación #${locCount} ---`)
            const defaultTitle = locCount === 1 ? 'Ceremonia Religiosa' : (locCount === 2 ? 'Recepción & Fiesta' : `Ubicación ${locCount}`)
            const eventNameInput = await ask(`   -> Nombre del evento #${locCount}`, defaultTitle)

            if (eventNameInput === '-1') {
                keepAdding = false
                break
            }

            const defaultVenue = locCount === 1 ? 'Catedral Metropolitana' : 'Salón Los Pinos'
            const venueInput = await ask(`   -> Nombre del lugar #${locCount}`, defaultVenue)
            if (venueInput === '-1') {
                keepAdding = false
                break
            }

            const addressInput = await ask(`   -> Dirección de la ubicación #${locCount}`, 'Av. Reforma 123, Col. Centro')
            if (addressInput === '-1') {
                keepAdding = false
                break
            }

            const linkInput = await ask(`   -> Link de ubicación (Google Maps / Waze) #${locCount}`, 'https://maps.google.com')
            if (linkInput === '-1') {
                keepAdding = false
                break
            }

            const timeInput = await ask(`   -> Hora de ubicación #${locCount}`, defaultTime)
            if (timeInput === '-1') {
                keepAdding = false
                break
            }

            locationItems.push({
                title: eventNameInput,
                venue: venueInput,
                location: addressInput,
                time: timeInput,
                date: eventDate,
                url: linkInput,
            })

            locCount++
        }

        if (locationItems.length === 0) {
            locationItems.push({
                title: 'Recepción & Evento Principal',
                venue: 'Salón Los Pinos',
                location: 'Av. Reforma 123',
                time: defaultTime,
                date: eventDate,
                url: 'https://maps.google.com',
            })
        }
    }

    // 2. Itinerario (Bucle Interactivo)
    const itineraryItems = []

    if (showItinerary) {
        console.log('\nConfiguración del Itinerario de Amenidades:')
        console.log('   (Escribe -1 en la hora cuando termines de agregar ítems)\n')

        let keepAddingItinerary = true

        while (keepAddingItinerary) {
            const timeInput = await ask(
                `   -> Hora de amenidad #${itineraryItems.length + 1} (o -1 para terminar)`,
                itineraryItems.length === 0 ? defaultTime : '-1'
            )

            if (timeInput === '-1') {
                keepAddingItinerary = false
                break
            }

            const eventTitle = await ask(`   -> Descripción para ${timeInput}`, 'Recepción & Cóctel')
            if (eventTitle === '-1') {
                keepAddingItinerary = false
                break
            }

            itineraryItems.push({
                time: timeInput,
                event: eventTitle,
            })
        }

        if (itineraryItems.length === 0) {
            itineraryItems.push({
                time: defaultTime,
                event: 'Recepción & Evento Principal',
            })
        }
    }

    return {
        places: {
            showPlaces,
            locations: locationItems,
        },
        itinerary: {
            showItinerary,
            itinerary: itineraryItems,
        },
    }
}
