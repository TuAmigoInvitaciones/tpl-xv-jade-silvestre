import { ask, printSectionTitle } from './prompts.js'

const formatDateFormatted = (dateStr) => {
    try {
        const [day, month, year] = dateStr.split(/[-/]/).map(Number)
        if (year && month && day) {
            const dateObj = new Date(year, month - 1, day)
            return dateObj.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).toUpperCase()
        }
    } catch {
        // Fallback
    }
    return '20 DE NOVIEMBRE DE 2026'
}

export async function promptHero(eventType) {
    printSectionTitle('3. Portada (Hero)')

    let promptNamesDefault = 'María & Carlos'
    if (eventType === 'xv') promptNamesDefault = 'Sofía Guadalupe'
    else if (eventType === 'graduation') promptNamesDefault = 'Ingeniería en Sistemas 2022-2026'
    else if (eventType === 'kids') promptNamesDefault = 'Mateo - 5º Cumpleaños'

    const names = await ask('   -> Nombre de novios / festejado / carrera / graduado', promptNamesDefault)
    const rawDate = await ask('   -> Fecha del evento principal (DD-MM-YYYY)', '20-11-2026')
    const formattedDate = formatDateFormatted(rawDate)
    const subtitle = await ask('   -> Subtítulo / Frase de portada', 'Nos complace invitarte a celebrar este momento tan especial')
    const city = await ask('   -> Ciudad del evento', 'Aguascalientes, México')

    return {
        eventDateRaw: rawDate,
        hero: {
            showHero: true,
            names,
            subtitle,
            date: formattedDate,
            city,
        },
    }
}
