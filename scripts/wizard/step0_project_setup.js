import path from 'path'
import fs from 'fs'
import pc from 'picocolors'
import { ask, askSelect, printHeader } from './prompts.js'

const TEMPLATES_ROOT = 'C:\\TuAmigoInvitaciones\\01-TEMPLATES'

const EVENT_SUBFOLDERS = {
    wedding: 'boda',
    xv: 'xv',
    graduation: 'graduacion',
    kids: 'infantiles',
    bautizo: 'bautizo',
    general: 'boda',
}

export async function promptProjectSetup() {
    printHeader('WIZARD DE CREACIÓN DE INVITACIONES DIGITALES')

    // 1. Nombre de la invitación / cliente
    const defaultFolderName = 'invitacion-' + Date.now().toString().slice(-4)
    const folderName = await ask('1. Nombre de la invitación (o nombre del cliente)', defaultFolderName)

    // 2. Tipo de evento
    const eventType = await askSelect('2. Selecciona el Tipo de Evento:', [
        { label: 'Boda', value: 'wedding' },
        { label: 'XV Años', value: 'xv' },
        { label: 'Graduación', value: 'graduation' },
        { label: 'Fiesta Infantil', value: 'kids' },
        { label: 'Bautizo', value: 'bautizo' },
        { label: 'General / Cumpleaños / Otro', value: 'general' },
    ])

    // 3. Determinar carpeta automáticamente dentro de C:\TuAmigoInvitaciones\01-TEMPLATES\<subfolder>
    const subfolder = EVENT_SUBFOLDERS[eventType] || 'boda'
    const defaultPath = path.join(TEMPLATES_ROOT, subfolder, folderName)

    const customPath = await ask('3. Ruta de destino donde se creará la invitación', defaultPath)

    let targetPath = path.resolve(customPath.trim())
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory() && path.basename(targetPath) !== folderName) {
        targetPath = path.join(targetPath, folderName)
    }

    console.log(`\n${pc.bold(pc.green('El nuevo proyecto se creará en:'))}\n   ${pc.cyan(targetPath)}\n`)

    return {
        folderName,
        eventType,
        targetPath,
    }
}
