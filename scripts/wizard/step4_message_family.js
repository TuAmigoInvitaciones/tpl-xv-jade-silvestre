import { ask, askConfirm, printSectionTitle } from './prompts.js'

export async function promptMessageAndFamily(eventType, defaultShowFamily = true) {
    printSectionTitle('4. Mensaje de Bienvenida & Sección de Familia')

    // 1. Mensaje de Invitación
    const message = await ask(
        '   -> Mensaje principal de la invitación',
        'Te invitamos de corazón a acompañarnos a compartir la alegría de este día inolvidable.'
    )
    const quote = await ask(
        '   -> Frase o cita célebre (opcional)',
        'El amor no es mirarse el uno al otro, sino mirar juntos en la misma dirección.'
    )

    // 2. Familia / Padres / Padrinos
    const showFamily = await askConfirm('   -> ¿Incluir sección de Familia / Padres / Padrinos?', defaultShowFamily)

    let familyData = {
        showFamily,
        title: 'Con la Bendición de Nuestros Padres',
        parents: eventType === 'wedding' ? { bride: [], groom: [] } : [],
        godparents: [],
    }

    if (showFamily) {
        if (eventType === 'wedding') {
            console.log('\n   -> Datos de los Padres de la Novia:')
            const brideFather = await ask('      -> Padre de la Novia', 'Roberto Morales')
            const brideMother = await ask('      -> Madre de la Novia', 'Elena Gutiérrez')
            familyData.parents = {
                bride: [brideFather, brideMother].filter(Boolean),
                groom: [],
            }

            console.log('\n   -> Datos de los Padres del Novio:')
            const groomFather = await ask('      -> Padre del Novio', 'Fernando Silva')
            const groomMother = await ask('      -> Madre del Novio', 'Patricia Mendoza')
            familyData.parents.groom = [groomFather, groomMother].filter(Boolean)

            const godparentsStr = await ask('\n   -> Padrinos Principales (separados por coma)', 'Carlos Morales, Sofia Silva')
            familyData.godparents = godparentsStr.split(',').map(s => s.trim()).filter(Boolean)

        } else if (eventType === 'xv') {
            familyData.title = 'Mis Padres y Padrinos'
            const father = await ask('      -> Nombre del Padre', 'Alejandro Sánchez')
            const mother = await ask('      -> Nombre de la Madre', 'Isela Carreón')
            familyData.parents = [father, mother].filter(Boolean)

            const godparentsStr = await ask('      -> Padrinos Principales (separados por coma)', 'Danna Janeth, Saulo Román')
            familyData.godparents = godparentsStr.split(',').map(s => s.trim()).filter(Boolean)

        } else {
            familyData.title = 'Agradecimientos Especiales'
            const customTitle = await ask('      -> Título de la sección de agradecimientos', 'Mis Padres y Padrinos / Maestros')
            familyData.title = customTitle

            const parentsStr = await ask('      -> Nombres de los Padres (separados por coma)', 'Alejandro Sánchez, Isela Carreón')
            familyData.parents = parentsStr.split(',').map(s => s.trim()).filter(Boolean)

            const godparentsStr = await ask('      -> Padrinos / Maestros / Agradecimientos (separados por coma)', 'Mtro. Juan Pérez, Danna Janeth')
            familyData.godparents = godparentsStr.split(',').map(s => s.trim()).filter(Boolean)
        }
    }

    return {
        message: {
            showMessage: true,
            message,
            quote,
        },
        family: familyData,
    }
}
