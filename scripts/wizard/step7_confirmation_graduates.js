import { ask, askSelect, askConfirm, printSectionTitle } from './prompts.js'

export async function promptConfirmationAndGraduates(eventType, showGraduatesDefault = false) {
    printSectionTitle('7. Confirmación RSVP & Directorio de Graduados')

    // 1. Confirmación de Asistencia (RSVP)
    const showConfirmation = await askConfirm('   -> ¿Incluir sección de Confirmación de Asistencia (RSVP)?', true)
    let confirmationData = {
        showConfirmation,
    }

    if (showConfirmation) {
        const type = await askSelect('   -> Tipo de plataforma para la confirmación RSVP:', [
            { label: 'Plataforma Abrasa (Gestión en tiempo real)', value: 'abrasa' },
            { label: 'Confirmación directa por WhatsApp', value: 'whatsapp' },
            { label: 'Llamada telefónica / Directo', value: 'phone call' },
        ])

        let eventId = ''
        let isQuantityFree = false
        let whatsappPhone = ''
        let whatsappMessage = ''

        if (type === 'abrasa') {
            eventId = await ask('      -> ID del Evento en Abrasa (para .env VITE_EVENT_ID)', '')
            isQuantityFree = await askConfirm('      -> ¿Modalidad de confirmación abierta libre? (Permite seleccionar cantidad de adultos/niños)', true)
        } else if (type === 'whatsapp') {
            whatsappPhone = await ask('      -> Número de WhatsApp para recibir confirmaciones', '4491234567')
            whatsappMessage = await ask('      -> Mensaje predeterminado de WhatsApp', '¡Hola! Confirmo mi asistencia al evento.')
        }

        confirmationData = {
            showConfirmation: true,
            type,
            eventId,
            isQuantityFree,
            whatsappPhone,
            whatsappMessage,
        }
    }

    // 2. Directorio de Graduados
    const showGraduates = eventType === 'graduation'
        ? await askConfirm('   -> ¿Incluir sección de Directorio de Graduados?', showGraduatesDefault)
        : false

    let graduatesData = {
        showGraduates: false,
    }

    if (showGraduates) {
        const title = await ask('      -> Título de la sección', 'Directorio de Graduados')
        const career = await ask('      -> Carrera / Especialidad', 'Ingeniería en Gestión Empresarial')
        const school = await ask('      -> Institución / Universidad', 'Universidad Tecnológica de Aguascalientes')

        const graduatesInput = await ask('      -> Lista de graduados (nombres separados por coma, o enter para dejarlo vacío)', '')
        const graduatesList = graduatesInput ? graduatesInput.split(',').map(s => s.trim()).filter(Boolean) : []

        graduatesData = {
            showGraduates: true,
            title,
            career,
            school,
            graduatesList,
        }
    }

    return {
        confirmation: confirmationData,
        graduates: graduatesData,
    }
}
