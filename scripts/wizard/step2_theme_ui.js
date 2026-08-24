import { askSelect, ask, printSectionTitle } from './prompts.js'

export async function promptThemeAndUI(namesDefault = 'María & Carlos', hasMusic = true) {
    printSectionTitle('2. Estilo Visual & Componentes de Interfaz (Theme & UI)')

    // 1. Paleta de Colores
    const paletteStr = await askSelect('Paleta de Colores a usar:', [
        { label: 'Paleta 1: Dusty Rose & Deep Plum', value: '1' },
        { label: 'Paleta 2: Crimson Wine & Warm Gold', value: '2' },
        { label: 'Paleta 3: Olive Sage & Warm Taupe', value: '3' },
        { label: 'Paleta 4: Forest Green & Powder Pink', value: '4' },
        { label: 'Paleta 5: Soft Blue & Steel Blue', value: '5' },
        { label: 'Paleta 6: Slate Teal & Mint', value: '6' },
        { label: 'Paleta 7: Fresh Lime & Olive', value: '7' },
        { label: 'Paleta 8: Warm Gold & Terracotta', value: '8' },
    ])
    const palette = parseInt(paletteStr, 10) || 1

    // 2. Font Pack
    const fontPackStr = await askSelect('Estilo de Tipografía (Font Pack):', [
        { label: 'Pack 1: Alex Brush + Cormorant Garamond + Montserrat', value: '1' },
        { label: 'Pack 2: Pinyon Script + Bodoni Moda + Plus Jakarta Sans', value: '2' },
        { label: 'Pack 3: Greating + EB Garamond + Open Sans', value: '3' },
        { label: 'Pack 4: Amsterdam Signature + Playfair Display + Raleway', value: '4' },
        { label: 'Pack 5: Halimunde Signature + Cinzel + Outfit', value: '5' },
    ])
    const fontPack = parseInt(fontPackStr, 10) || 1

    // 3. Variante de Sobre / Apertura (Envelop)
    const envelopType = await askSelect('Variante del Sobre de Apertura (Envelop):', [
        { label: 'Cerrado / Abierto Tradicional (cerrado-abierto)', value: 'cerrado-abierto' },
        { label: 'Video de Apertura (video-apertura)', value: 'video-apertura' },
        { label: 'Animación de Apertura Premium (animacion-apertura)', value: 'animacion-apertura' },
    ])

    // 4. Menú de Navegación
    const menuTitle = await ask('   -> Título para la barra de navegación', namesDefault)
    const menuVariant = await askSelect('Variante visual del menú:', [
        { label: 'Barra Superior (Sticky Bar)', value: 'bar' },
        { label: 'Botón Flotante (Floating Drawer)', value: 'floating' },
    ])

    // 5. Reproductor de Música
    let musicTitle = 'Música de fondo'
    let musicVariant = 'floating'

    if (hasMusic) {
        musicTitle = await ask('   -> Título del tema / canción de fondo', 'Música de fondo')
        musicVariant = await askSelect('Variante del reproductor de música:', [
            { label: 'Botón Flotante Circular (Floating)', value: 'floating' },
            { label: 'Barra Inferior Fija (Bottom Bar)', value: 'bar' },
        ])
    }

    return {
        theme: {
            fontPack,
            palette,
        },
        envelopType,
        ui: {
            menu: {
                show: true,
                variant: menuVariant,
                title: menuTitle,
                buttonVariant: 'icon',
            },
            music: {
                show: hasMusic,
                variant: musicVariant,
                title: musicTitle,
                buttonVariant: 'primary',
            },
        },
    }
}
