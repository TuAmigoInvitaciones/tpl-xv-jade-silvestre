import { ask, askConfirm, printSectionTitle } from './prompts.js'

export async function promptFarewell(namesDefault = 'María & Carlos') {
    printSectionTitle('10. Cierre de Invitación & Despedida')

    const showFarewell = await askConfirm('   -> ¿Incluir sección final de Despedida / Agradecimiento?', true)
    let farewellData = {
        showFarewell,
    }

    if (showFarewell) {
        const cleanHashtagDefault = '#' + namesDefault.replace(/[^a-zA-Z0-9]/g, '')
        const hashtag = await ask('      -> Hashtag oficial del evento', cleanHashtagDefault)
        const thankYouMessage = await ask(
            '      -> Mensaje final de agradecimiento',
            'Gracias por ser parte fundamental de nuestras vidas y acompañarnos en este día tan especial.'
        )

        farewellData = {
            showFarewell: true,
            hashtag,
            thankYouMessage,
        }
    }

    return farewellData
}
