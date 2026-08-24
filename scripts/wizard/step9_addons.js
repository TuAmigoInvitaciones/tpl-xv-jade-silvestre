export async function promptAddons(selectedAddons = {}) {
    return {
        lodgingAndWeather: {
            showLodging: Boolean(selectedAddons.lodgingAndWeather),
            title: 'Hospedaje & Clima',
            hotels: [],
            weatherCity: 'Aguascalientes',
        },
        ourStory: {
            showOurStory: Boolean(selectedAddons.ourStory),
            title: 'Nuestra Historia',
            quoteOrPoem: 'Por encima de todo, vístanse de amor.',
            timeline: [],
        },
        faqAndMenu: {
            showFaqAndMenu: Boolean(selectedAddons.faqAndMenu),
            title: 'Preguntas Frecuentes & Menú',
            faqs: [],
            menuCourses: [],
        },
        playlistAndPhotos: {
            showPlaylistAndPhotos: Boolean(selectedAddons.playlistAndPhotos),
            title: 'Música & Fotos de Invitados',
        },
        monogram: {
            showMonogram: Boolean(selectedAddons.monogram),
            title: 'Monograma del Evento',
        },
    }
}
