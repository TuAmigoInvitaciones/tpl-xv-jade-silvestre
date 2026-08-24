import { ask, askConfirm, printSectionTitle } from './prompts.js'

export async function promptProtocolAndPresents(showDressCodeDefault = true, showPresentsDefault = true) {
    printSectionTitle('6. Código de Vestimenta & Mesa de Regalos')

    // 1. Código de Vestimenta
    const showDressCode = await askConfirm('   -> ¿Incluir sección de Código de Vestimenta?', showDressCodeDefault)
    let dressCodeData = {
        showDressCode,
    }

    if (showDressCode) {
        const title = await ask('      -> Título de la sección', 'Código de Vestimenta')
        const description = await ask('      -> Descripción general', 'Te sugerimos vestir de etiqueta semi-formal.')
        const menAttire = await ask('      -> Recomendación para Hombres', 'Traje oscuro y corbata.')
        const womenAttire = await ask('      -> Recomendación para Mujeres', 'Vestido largo o de noche.')

        const suggestedStr = await ask('      -> Colores sugeridos (separados por coma)', 'negro, azul marino')
        const avoidStr = await ask('      -> Colores a evitar (separados por coma)', 'blanco, beige')
        const noKids = await askConfirm('      -> ¿Activar etiqueta "No Niños" / Evento de Adultos?', true)

        dressCodeData = {
            showDressCode: true,
            title,
            description,
            attire: {
                men: menAttire,
                women: womenAttire,
            },
            colors: {
                suggested: suggestedStr.split(',').map(s => s.trim()).filter(Boolean),
                avoid: avoidStr.split(',').map(s => s.trim()).filter(Boolean),
            },
            noKids,
        }
    }

    // 2. Mesa de Regalos / Datos Bancarios
    const showPresents = await askConfirm('   -> ¿Incluir sección de Mesa de Regalos / Lluvia de Sobres?', showPresentsDefault)
    let presentsData = {
        showPresents,
    }

    if (showPresents) {
        const title = await ask('      -> Título de la sección', 'Mesa de Regalos & Lluvia de Sobres')
        const url = await ask('      -> URL / Enlace de la mesa de regalos (Liverpool, Amazon, etc.)', 'https://mesaderegalos.liverpool.com.mx')

        const hasBankDetails = await askConfirm('      -> ¿Incluir datos bancarios para transferencias?', true)
        let bankDetails = {
            bank: '',
            account: '',
            clabe: '',
            holder: '',
        }

        if (hasBankDetails) {
            const bank = await ask('         -> Banco', 'BBVA')
            const holder = await ask('         -> Titular de la cuenta', 'María Morales')
            const clabe = await ask('         -> CLABE interbancaria', '012180012345678901')
            const account = await ask('         -> Número de cuenta o tarjeta', '1234567890')
            bankDetails = { bank, holder, clabe, account }
        }

        const envelopeRain = await askConfirm('      -> ¿Mencionar modalidad de Lluvia de Sobres?', true)

        presentsData = {
            showPresents: true,
            title,
            url,
            bankDetails,
            envelopeRain,
        }
    }

    return {
        dressCode: dressCodeData,
        presents: presentsData,
    }
}
