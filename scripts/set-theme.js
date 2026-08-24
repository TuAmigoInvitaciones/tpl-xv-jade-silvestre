import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const configPath = path.join(projectRoot, 'invitation.config.json')

const args = process.argv.slice(2)

let fontPack
let palette
let menuVariant
let musicVariant
let buttonVariant

args.forEach((arg) => {
    if (arg.startsWith('--font=')) fontPack = parseInt(arg.split('=')[1], 10)
    else if (arg.startsWith('--palette=')) palette = parseInt(arg.split('=')[1], 10)
    else if (arg.startsWith('--menu=')) menuVariant = arg.split('=')[1]
    else if (arg.startsWith('--music=')) musicVariant = arg.split('=')[1]
    else if (arg.startsWith('--button=')) buttonVariant = arg.split('=')[1]
    else if (!fontPack && !isNaN(parseInt(arg, 10))) fontPack = parseInt(arg, 10)
    else if (fontPack && !palette && !isNaN(parseInt(arg, 10))) palette = parseInt(arg, 10)
})

let fullConfig = {
    theme: {
        fontPack: 1,
        palette: 2,
        buttonVariant: 'primary',
        menu: {
            variant: 'floating',
            title: 'Menú',
            buttonVariant: 'icon',
        },
        music: {
            variant: 'floating',
            buttonVariant: 'primary',
            songTitle: 'Música de fondo',
            artistName: 'Música del evento',
        },
    },
    config: {},
    sections: {}
}

if (fs.existsSync(configPath)) {
    try {
        const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'))
        fullConfig = { ...fullConfig, ...parsed }
        if (parsed.theme) {
            fullConfig.theme = { ...fullConfig.theme, ...parsed.theme }
        }
    } catch (e) {}
}

const currentMenu = fullConfig.theme.menu || { variant: 'floating', title: 'Menú', buttonVariant: 'icon' }
const currentMusic = fullConfig.theme.music || { variant: 'floating', buttonVariant: 'primary', songTitle: 'Música de fondo', artistName: 'Música del evento' }

fullConfig.theme = {
    ...fullConfig.theme,
    fontPack: fontPack || fullConfig.theme.fontPack,
    palette: palette || fullConfig.theme.palette,
    buttonVariant: buttonVariant || fullConfig.theme.buttonVariant,
    menu: {
        ...currentMenu,
        variant: menuVariant || currentMenu.variant || 'floating',
    },
    music: {
        ...currentMusic,
        variant: musicVariant || currentMusic.variant || 'floating',
    },
}

fs.writeFileSync(configPath, JSON.stringify(fullConfig, null, 2), 'utf8')

console.log('🎯 Configuración actualizada en invitation.config.json:', fullConfig.theme)

execSync('node scripts/sync-theme.js', { stdio: 'inherit', cwd: projectRoot })
